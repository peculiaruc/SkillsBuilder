import UserTabs from './UserTabs';

export default {
  path: 'users',
  children: [
    {
      index: true,
      element: <UserTabs />,
    },
  ],
};
