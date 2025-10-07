// ===============================================================
//  PURPOSE: Application entry point.
//  Renders the root <App /> component inside the #root element.
// ===============================================================

import 'normalize.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// --- Render Root Application ---
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();


