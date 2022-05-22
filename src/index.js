import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    {console.log("[Index] sessionStorage: "+sessionStorage.getItem("email"))}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
