import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ParallaxProvider } from 'react-scroll-parallax';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </React.StrictMode>
  );
}
