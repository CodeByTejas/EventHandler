import React from 'react';
import { createRoot } from 'react-dom/client'; // Use the new createRoot API
import App from './App';
import Modal from 'react-modal'; // Import react-modal

// Set the app element for accessibility
Modal.setAppElement('#root');  // Ensure modal is accessible

// Create a root and render the App component
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
