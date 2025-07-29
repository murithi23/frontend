import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import store from './store/store';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';

// Components
import AppNavbar from './components/AppNavbar';
import ErrorBoundary from './components/ErrorBoundary';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import Toast from './components/Toast';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  console.log('OpenCart App rendering...'); // Debug log
  
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* Main Navigation */}
            <AppNavbar />
            
            {/* Breadcrumb Navigation */}
            <BreadcrumbNavigation />
            
            {/* Main Content Area */}
            <main className="main-content">
              <div className="container-fluid px-4">
                <Routes>
                  {/* Home/Landing Page */}
                  <Route path="/" element={<Home />} />
                  
                  {/* About Page */}
                  <Route path="/about" element={<About />} />
                  
                  {/* Product Routes */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  
                  {/* Shopping Cart & Checkout */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Order Management */}
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={
                    <div className="container mt-5 text-center">
                      <h1>404 - Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                  } />
                </Routes>
              </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-dark text-light py-4 mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h5>OpenCart</h5>
                    <p>Your trusted e-commerce platform</p>
                  </div>
                  <div className="col-md-4">
                    <h6>Quick Links</h6>
                    <ul className="list-unstyled">
                      <li><a href="/" className="text-light">Home</a></li>
                      <li><a href="/products" className="text-light">Products</a></li>
                      <li><a href="/about" className="text-light">About</a></li>
                      <li><a href="/cart" className="text-light">Cart</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h6>Customer Service</h6>
                    <ul className="list-unstyled">
                      <li><a href="/orders" className="text-light">Order History</a></li>
                      <li><span className="text-light">Support: support@opencart.com</span></li>
                      <li><span className="text-light">Phone: (555) 123-4567</span></li>
                    </ul>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="text-center">
                  <small>&copy; 2025 OpenCart. All rights reserved.</small>
                </div>
              </div>
            </footer>
            
            {/* Toast Notifications */}
            <Toast />
            <ToastContainer position="top-end" className="p-3" />
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
