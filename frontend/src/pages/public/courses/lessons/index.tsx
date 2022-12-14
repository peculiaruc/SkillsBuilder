import EditLesson from '../../../admin/course/lesson/EditLesson';

const courseRoutes = {
  path: 'lesson',
  children: [
    {
      path: ':id',
      element: <EditLesson />,
    },
  ],
};

export default courseRoutes;
