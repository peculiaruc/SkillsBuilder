import CourseDetails from '../../public/courses/CourseDetails';
import ViewAssignment from '../assignment/ViewAssignment';
import AuthorCourse from './AuthorCourse';
import CourseLessons from './CourseLessons';
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
    {
      path: ':id/lessons',
      element: <CourseLessons />,
    },
  ],
};

export default courseRoutes;
