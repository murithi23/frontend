// src/components/Cart.js
import { Table, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <Card>
      <Card.Header as="h5">Shopping Cart</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button 
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><strong>Total</strong></td>
              <td colSpan={2}><strong>${cart.total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </Table>
        <Link to="/checkout">
          <Button variant="success">Proceed to Checkout</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}