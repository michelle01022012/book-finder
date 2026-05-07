import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Global.css';

// This grabs the root div from your index.html and renders the React app inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);