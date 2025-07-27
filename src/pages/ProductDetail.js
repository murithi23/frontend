import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import productService from '../services/productService';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    productService.getProductById(id)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="mt-4">
      <div className="row g-0">
        <div className="col-md-6">
          <Card.Img 
            variant="top" 
            src={product.image || '/placeholder.png'} 
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text className="text-muted">{product.description}</Card.Text>
            <Card.Text className="h4">${product.price.toFixed(2)}</Card.Text>
            <Button 
              variant="primary"
              onClick={() => dispatch(addItem({
                id: product._id,
                name: product.name,
                price: product.price
              }))}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}