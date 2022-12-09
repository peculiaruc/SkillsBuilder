import AuthorAssignment from './AuthorAssigment';
import CreateAssignmentQuestionView from './CreateAssignmentQuestionView';
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
    {
      path: 'courses/:id',
      element: <CreateAssignmentQuestionView />,
    },
  ],
};

export default assignmentRoutes;
