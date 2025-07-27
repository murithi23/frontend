import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Product service URL

// Create named service object
const productService = {
  getAllProducts: () => {
    return axios.get(`${API_URL}/products`);
  },
  
  getProductById: (id) => {
    return axios.get(`${API_URL}/products/${id}`);
  },
  
  searchProducts: (query) => {
    return axios.get(`${API_URL}/products/search`, { params: { q: query } });
  }
};

// Export the named service
export default productService;