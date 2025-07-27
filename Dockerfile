# frontend/Dockerfile
FROM node:16 as build

WORKDIR /app

# Copy package.json and yarn.lock first
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile  # Ensures exact versions from lockfile

# Copy the rest of the application
COPY . .

# Build the React app
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]