import BackgroundLayout from '../layout/BackgroundLayout';
import authroutes from './auth/routes';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardView from './dashboard';
import Assignments from './admin/Assignments';
import Courses from './admin/Courses';
import publicroutes from './public';

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
            element: <DashboardView />,
          },
          ...publicroutes,
          {
            path: '/assignments',
            element: <Assignments />,
          },
          {
            path: '/courses',
            element: <Courses />,
          },
        ],
      },
      authroutes,
    ],

  }];
