import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router";
import { router } from './Router/Router';
import AuthProvider from './Contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';
import ThemeProvider, { ThemeContext } from './Header/ThemsProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Toaster />
    <ThemeProvider>
      <AuthProvider>
        <div className='font-rancho'>
             <RouterProvider router={router} />
        </div>
     
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
