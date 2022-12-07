import { useGetUsersByRoleQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import CreateUserForm from './CreateUserForm';
import UserGrid from './UserGrid';

type Props = {
  userRole: string
};

export default function UserList({ userRole }:Required<Props>) {
  const { data, isLoading } = useGetUsersByRoleQuery(userRole);
  if (isLoading) return <Loader />;
  const users = data?.data.users ?? [];
  return (
    <UserGrid users={users}>
      <CreateUserForm title={`Add new ${userRole === 'all' ? 'user' : userRole.slice(0, userRole.length - 1)}`} />
    </UserGrid>
  );
}
