import { Outlet } from 'react-router-dom';
import ViewAssignment from '../assignment/ViewAssignment';
import AuthorCourse from './AuthorCourse';
import AuthorCourseDetails from './AuthorCourseDetails';
import PublicCourse from './PublicCourse';
import lesson from './lesson';

const courseRoutes = {
  element: <Outlet />,
  children: [
    {
      path: 'courses',
      children: [
        {
          index: true,
          element: <PublicCourse />,
        },
        {
          path: 'me',
          element: <AuthorCourse />,
        },
        {
          path: ':id',
          element: <AuthorCourseDetails />,
        },
        {
          path: ':id/assignments',
          element: <ViewAssignment />,
        },
      ],
    },
    lesson,
  ],
};

export default courseRoutes;
