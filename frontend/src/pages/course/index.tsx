import CourseList from './CourseList';
import CreateCourse from './CreateCourse';

const courseRoutes = {
  path: '/courses',
  children: [
    {
      index: true,
      element: <CourseList />,
    },
    {
      path: 'create',
      exact: true,
      element: <CreateCourse />,
    },
  ],
};

export default courseRoutes;
