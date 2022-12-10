import ViewAssignment from '../assignment/ViewAssignment';
import AuthorCourse from './AuthorCourse';
import AuthorCourseDetails from './AuthorCourseDetails';
import PublicCourse from './PublicCourse';

const courseRoutes = {
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
};

export default courseRoutes;
