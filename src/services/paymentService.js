// src/services/paymentService.js
import axios from 'axios';

const API_URL = '/api/payment';

export default {
  createPayment: (paymentData) => axios.post(API_URL, paymentData),
  getPaymentByOrderId: (orderId) => axios.get(`${API_URL}/order/${orderId}`),
  getAllPayments: () => axios.get(API_URL)
};