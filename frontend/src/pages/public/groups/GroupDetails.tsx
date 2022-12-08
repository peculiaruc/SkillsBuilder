import { useParams } from 'react-router-dom';
import { useGetGroupByIdQuery, useUpdateGroupMutation } from '../../../apiServices/groupService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import Group from '../../../models/Group';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import GroupFeed from './GroupFeed';
import GroupMember from './GroupMember';
import GroupRequestList from './GroupRequestList';

export default function GroupDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [updateGroup] = useUpdateGroupMutation();

  const { data, isLoading } = useGetGroupByIdQuery(Number(id));

  if (isLoading) return <Loader />;

  const group = data?.data.groups;
  if (!group) {
    return (<EmptyView title="Group not found" code={404} />);
  }

  const protectedTabs = (user.id === group.owner_id || user.role > 1) ? [
    {
      name: 'Access Requests',
      component: (<GroupRequestList />),
    },
    {
      name: 'Settings',
      component: (
        <MixedForm
          dialog={false}
          title="Update Group Setting"
          mutation={updateGroup}
          model={new Group(group)}
          cancelBtn={false}
        />),
    },
  ] : [];

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
        ...protectedTabs,
      ]}
    />
  );
}
