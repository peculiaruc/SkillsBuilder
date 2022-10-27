import AuthLayout from '../../layout/AuthLayout';
import LoginView from './LoginView';

const routes = {
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginView />,
    },
  ],
};

export default routes;
