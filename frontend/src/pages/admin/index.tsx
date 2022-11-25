import Dashboard from './dashboard';
import course from './course';
import assignment from './assignment';

const assignmentRoutes = {
  path: 'admin',
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    course,
    assignment,

  ],
};

export default assignmentRoutes;
