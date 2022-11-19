import CourseList from './CourseList';
import CreateCourse from './CreateCourse';
import ViewCourse from './ViewCourse';

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
    {
      path: ':id',
      element: <ViewCourse />,
    },
    {
      path: ':id/edit',
      element: <ViewCourse />,
    },
  ],
};

export default courseRoutes;
