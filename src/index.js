// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root using React 18
root.render(<App />);  // Render the App component

