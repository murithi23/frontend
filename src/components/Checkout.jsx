// src/components/Checkout.js
import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';
import { clearCart } from '../store/cartSlice';

export default function Checkout() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [orderStatus, setOrderStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create order
      const orderResponse = await orderService.createOrder({
        customer,
        items: cart.items,
        total: cart.total
      });
      
      // Process payment
      const paymentResponse = await paymentService.createPayment({
        orderId: orderResponse.data._id,
        amount: cart.total,
        cardDetails: payment
      });
      
      if (paymentResponse.data.status === 'completed') {
        setOrderStatus('success');
        dispatch(clearCart());
      } else {
        setOrderStatus('payment_failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderStatus('error');
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Checkout</Card.Header>
      <Card.Body>
        {orderStatus === 'success' ? (
          <Alert variant="success">
            <h4>Order Placed Successfully!</h4>
            <p>Your payment has been processed. Thank you for your purchase.</p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                required
                value={customer.name}
                onChange={e => setCustomer({...customer, name: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                required
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                required
                value={customer.address}
                onChange={e => setCustomer({...customer, address: e.target.value})}
              />
            </Form.Group>
            
            <h5>Payment Details</h5>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                type="text" 
                required
                value={payment.cardNumber}
                onChange={e => setPayment({...payment, cardNumber: e.target.value})}
              />
            </Form.Group>
            
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="MM/YY"
                    required
                    value={payment.expiry}
                    onChange={e => setPayment({...payment, expiry: e.target.value})}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control 
                    type="text" 
                    required
                    value={payment.cvv}
                    onChange={e => setPayment({...payment, cvv: e.target.value})}
                  />
                </Form.Group>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <h5>Total: ${cart.total.toFixed(2)}</h5>
              <Button variant="primary" type="submit">
                Place Order
              </Button>
            </div>
            
            {orderStatus === 'error' && (
              <Alert variant="danger" className="mt-3">
                Error processing your order. Please try again.
              </Alert>
            )}
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}