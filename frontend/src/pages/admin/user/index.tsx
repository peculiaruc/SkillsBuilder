import Profile from '../../public/Profile';
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
  ],
};
