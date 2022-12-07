import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetGroupByIdQuery } from '../../../apiServices/groupService';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import EmptyView from '../../errors/EmptyView';
import GroupFeed from './GroupFeed';
import GroupMember from './GroupMember';

export default function GroupDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetGroupByIdQuery(Number(id));

  if (isLoading) return <Loader />;

  const group = data?.data.groups;
  if (!group) {
    return (<EmptyView title="Group not found" code={404} />);
  }

  return (
    <TabView
      title={group.name}
      tabs={[
        {
          name: 'Group Feed',
          component: (<GroupFeed />),
        },
        {
          name: 'Members',
          component: (<GroupMember group={group} />),
        },
        {
          name: 'Settings',
          component: (<Typography>Group Settings for the owner</Typography>),
        },
      ]}
    />
  );
}
