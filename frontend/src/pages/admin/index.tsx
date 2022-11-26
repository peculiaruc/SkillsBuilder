import Dashboard from './dashboard';
import course from './course';
import assignment from './assignment';
import MyGroupList from '../public/groups/MyGroupList';

const assignmentRoutes = {
  path: 'admin',
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    course,
    assignment,
    {
      path: 'groups',
      element: <MyGroupList />,
    },
  ],
};

export default assignmentRoutes;
