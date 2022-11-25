import AssignmentList from './AssignmentList';
import CreateAssignmentQuestionView from './CreateAssignmentQuestionView';

const assignmentRoutes = {
  path: 'assignments',
  children: [
    {
      index: true,
      element: <AssignmentList />,
    },
    {
      path: ':id',
      element: <AssignmentList />,
    },
    {
      path: 'courses/:id',
      element: <CreateAssignmentQuestionView />,
    },
  ],
};

export default assignmentRoutes;
