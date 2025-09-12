import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('main.tsx is loading...');

const root = document.getElementById('root');
console.log('Root element:', root);

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('React app rendered');
} else {
  console.error('Root element not found!');
}
