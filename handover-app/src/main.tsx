import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HandoverProvider } from './context/HandoverContext'

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <HandoverProvider>
        <App />
      </HandoverProvider>
    </StrictMode>,
  );
} else {
  console.error('Root element not found!');
}
