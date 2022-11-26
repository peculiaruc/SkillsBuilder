import TabView from '../../../components/TabView';
import GroupListAll from './GroupListAll';
import GroupListJoined from './GroupListJoined';
import GroupListMe from './GroupListMe';

function MyGroupList() {
  return (
    <TabView
      title="My Groups"
      tabs={
      [
        {
          name: 'All',
          component: <GroupListAll />,
        },
        {
          name: 'My Groups',
          component: <GroupListMe />,
        },
        {
          name: 'Joined groups',
          component: <GroupListJoined />,
        },
      ]
     }

    />

  );
}

export default MyGroupList;
