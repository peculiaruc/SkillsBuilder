import AuthorAssignment from './AuthorAssigment';
import ViewAssignment from './ViewAssignment';

const assignmentRoutes = {
  path: 'assignments',
  children: [
    {
      index: true,
      element: <AuthorAssignment />,
    },
    {
      path: ':id',
      element: <ViewAssignment />,
    },
  ],
};

export default assignmentRoutes;
