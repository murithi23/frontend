import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About OpenCart</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            OpenCart is a modern e-commerce platform built with React, Node.js, and microservices architecture.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Our Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Product catalog with real-time updates</li>
            <li>Secure checkout process</li>
            <li>Order history tracking</li>
            <li>Responsive design for all devices</li>
          </ul>

          <div className="mt-8">
            <Link 
              to="/" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}