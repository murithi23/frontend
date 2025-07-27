import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Badge,
  Alert
} from 'react-bootstrap';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, removeItem, updateQuantity }) => {
  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Card className="shadow-sm py-5">
          <Card.Body>
            <FaShoppingBag size={48} className="text-muted mb-3" />
            <h3>Your cart is empty</h3>
            <p className="text-muted mb-4">
              You haven't added any items to your cart yet
            </p>
            <Button 
              as={Link} 
              to="/products" 
              variant="primary"
              className="px-4"
            >
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">
        Your Shopping Cart
        <Badge bg="secondary" className="ms-2">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Badge>
      </h1>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '45%' }}>Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded me-3"
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <h5 className="mb-1">{item.name}</h5>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-danger p-0"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                            >
                              <FaTrash className="me-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <div className="d-flex align-items-center justify-content-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </td>
                      <td className="align-middle text-end">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="align-middle text-end">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Alert variant="info" className="d-flex align-items-center">
            <div className="flex-grow-1">
              <strong>Free shipping</strong> on orders over $100
            </div>
            <div>
              ${(100 - subtotal).toFixed(2)} more to qualify
            </div>
          </Alert>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h5 className="mb-4">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button
                as={Link}
                to="/checkout"
                variant="primary"
                size="lg"
                className="w-100 mb-3 py-3"
              >
                Proceed to Checkout
              </Button>
              
              <Button
                as={Link}
                to="/products"
                variant="outline-primary"
                size="lg"
                className="w-100 py-3"
              >
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired
};

export default Cart;