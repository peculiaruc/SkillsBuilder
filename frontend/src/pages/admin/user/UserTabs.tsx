import TabView from '../../../components/TabView';
import UserList from './UserList';

function UserTabs() {
  return (
    <TabView
      title="Users"
      tabs={
      [
        {
          name: 'All',
          component: <UserList userRole="all" />,
        },
        {
          name: 'Learners',
          component: <UserList userRole="learners" />,
        },
        {
          name: 'Course authors',
          component: <UserList userRole="authors" />,
        },
        {
          name: 'Admins',
          component: <UserList userRole="admins" />,
        },
      ]
     }

    />

  );
}

export default UserTabs;
