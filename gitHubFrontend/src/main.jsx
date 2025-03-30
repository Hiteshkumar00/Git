import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthContextProvider } from './AuthContext.jsx';
import ProjectRoutes from './ProjectRoutes.jsx';

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BrowserRouter>
      <ProjectRoutes />
    </BrowserRouter>
  </AuthContextProvider>
);
