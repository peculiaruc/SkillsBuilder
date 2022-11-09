import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordView from './ForgotPasswordView';
import LoginView from './LoginView';
import ResetPasswordView from './ResetPasswordView';
import SignupView from './SignupView';

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
    {
      path: '/reset-password',
      element: <ResetPasswordView />,
    },
    {
      path: '/signup',
      element: <SignupView />,
    },
  ],
};

export default routes;
