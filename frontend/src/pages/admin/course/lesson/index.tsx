import { Outlet } from 'react-router-dom';
import EditLesson from './EditLesson';

const lessonRoutes = {
  path: 'lesson',
  element: <Outlet />,
  children: [
    {
      path: ':id/edit',
      element: <EditLesson />,
    },
  ],
};

export default lessonRoutes;
