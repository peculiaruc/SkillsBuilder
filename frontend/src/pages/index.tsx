import BackgroundLayout from '../layout/BackgroundLayout';
import authroutes from './auth/routes';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardView from './dashboard';

export default [{
  element: <BackgroundLayout />,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      chrildren: [
        {
          index: true,
          element: <DashboardView />,
        },
      ],
    },
    authroutes,
  ],

}];
