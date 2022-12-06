import Dashboard from './dashboard';
import course from './course';
import assignment from './assignment';
import MyGroupList from '../public/groups/MyGroupList';
import Overview from './overview/Overview';
import PreloadData from './dashboard/PreloadData';
import user from './user';

const assignmentRoutes = {
  path: 'admin',
  element: <PreloadData />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: 'overview',
      element: <Overview />,
    },
    course,
    assignment,
    {
      path: 'groups',
      element: <MyGroupList />,
    },
    user,
  ],
};

export default assignmentRoutes;
