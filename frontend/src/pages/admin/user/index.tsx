import Profile from '../../public/Profile';
import EditUser from './EditUser';
import UserTabs from './UserTabs';

export default {
  path: 'users',
  children: [
    {
      index: true,
      element: <UserTabs />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: ':id/edit',
      element: <EditUser />,
    },
  ],
};
