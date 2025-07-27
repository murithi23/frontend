// src/services/orderService.js
import axios from 'axios';

const API_URL = '/api/orders';

const orderService = {
  createOrder: (order) => axios.post(API_URL, order),
  getOrders: () => axios.get(API_URL)
};

export default orderService;