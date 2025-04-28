// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // <- Correct, because App is in src/
import './styles/index.css'; // <- If you have styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);