import BackgroundLayout from '../layout/BackgroundLayout';
import authroutes from './auth/routes';
import DashboardView from './dashboard';

export default [{
  element: <BackgroundLayout />,
  children: [
    {
      path: '/',
      element: <DashboardView />,
    },
    authroutes,
  ],

}];
