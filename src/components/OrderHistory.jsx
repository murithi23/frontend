import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';
import orderService from '../services/orderService';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders()
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <Card.Header as="h5">Your Orders</Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.items.length}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.status || 'Processing'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}