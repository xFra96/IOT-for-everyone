import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/bootstrap.css';
import './assets/index.css';
import App from './App';
import ModelProvider from './model.provider'

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <ModelProvider>
    <App />
  </ModelProvider>
);