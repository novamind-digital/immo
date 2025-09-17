import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { HandoverProvider } from './context/HandoverContext'

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <AuthProvider>
        <HandoverProvider>
          <App />
        </HandoverProvider>
      </AuthProvider>
    </StrictMode>,
  );
} else {
  console.error('Root element not found!');
}
