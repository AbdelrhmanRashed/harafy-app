import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { DirectionProvider } from '@/components/ui/direction';
import App from './App.tsx';
import RegisterPage from './pages/auth/RegisterPage/RegisterPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider dir="rtl" direction="rtl">
      <App />
    </DirectionProvider>
  </StrictMode>,
);
