import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import VerificationPage from './pages/auth/VerificationPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}

    <VerificationPage />
  </StrictMode>,
);
