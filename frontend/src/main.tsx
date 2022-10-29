import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import store from './store';
import routes from './pages';
import theme from './theme/theme';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const Router = () => useRoutes(routes);

window.toast = toast;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
