import CourseDetails from '../../public/courses/CourseDetails';
import ViewAssignment from '../assignment/ViewAssignment';
import AuthorCourse from './AuthorCourse';
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
      element: <CourseDetails />,
    },
    {
      path: ':id/assignments',
      element: <ViewAssignment />,
    },
  ],
};

export default courseRoutes;
