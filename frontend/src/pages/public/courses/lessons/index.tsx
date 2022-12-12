import ViewLesson from './ViewLesson';

const courseRoutes = {
  path: 'lesson',
  children: [
    {
      path: ':id',
      element: <ViewLesson />,
    },
  ],
};

export default courseRoutes;
