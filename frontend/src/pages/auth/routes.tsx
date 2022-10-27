import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordView from './ForgotPasswordView';
import LoginView from './LoginView';

const routes = {
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginView />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordView />,
    },
  ],
};

export default routes;
