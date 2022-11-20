import CourseList from './CourseList';

const courseRoutes = {
  path: '/courses',
  children: [
    {
      index: true,
      element: <CourseList />,
    },
  ],
};

export default courseRoutes;
