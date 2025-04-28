import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Optional: global styles
import App from './App'  // No need for '/components' if it's directly in src

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)