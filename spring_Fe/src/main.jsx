import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <StrictMode>
          <App />
          <Toaster />
        </StrictMode>
  </AuthProvider>
)
