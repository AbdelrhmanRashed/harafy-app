import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminLayout />
    {/* <App /> */}
  </StrictMode>,
);
