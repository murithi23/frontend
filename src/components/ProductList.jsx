import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from './ProductCard'; // Fixed import
import productService from '../services/productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAllProducts()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Dispatch to Redux store here
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product);
    // Implement quick view modal here
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {products.map(product => (
        <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
          <ProductCard 
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image || 'placeholder.png',
              originalPrice: product.originalPrice,
              badge: product.badge,
              rating: product.rating,
              reviews: product.reviews
            }}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        </div>
      ))}
    </Row>
  );
}