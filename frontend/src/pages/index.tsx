import BackgroundLayout from '../layout/BackgroundLayout';
import DashboardLayout from '../layout/DashboardLayout';
import adminroutes from './admin';
import authroutes from './auth/routes';
import DashboardProvider from './DashboardProvider';
import learnersRoutes from './public';

export default [
  {
    element: <BackgroundLayout />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardProvider />,
          },
          ...learnersRoutes,
          adminroutes,
        ],
      },
      authroutes,
    ],

  }];
