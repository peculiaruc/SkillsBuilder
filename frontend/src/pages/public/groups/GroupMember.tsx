import { useGetGroupMembersQuery } from '../../../apiServices/groupService';
import Loader from '../../../components/Loader';
import { GroupType } from '../../../interfaces/GroupTypes';
import { UserType } from '../../../interfaces/UserType';
import UserGrid from '../../admin/user/UserGrid';

type Props = {
  group: GroupType
};

export default function GroupMember({ group } : Props) {
  const { data, isLoading } = useGetGroupMembersQuery(group.id);
  if (isLoading) return <Loader />;
  const users = data?.data.members as UserType[];
  return (
    <UserGrid users={users} />
  );
}
