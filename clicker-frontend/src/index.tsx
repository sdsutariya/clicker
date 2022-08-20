import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes';
import { ThemeProvider } from '@mui/material';
import theme from './Theme/Theme';
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './Apis/QueryClient';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);