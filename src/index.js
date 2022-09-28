import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import ModelProvider from './misc/model.provider'

ReactDOM.render(
    <ModelProvider>
      <App />
  </ModelProvider>,
  document.getElementById('root')
);