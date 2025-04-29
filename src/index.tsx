import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// eslint-disable-next-line
const element = document.getElementById('root')!;
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>
);
