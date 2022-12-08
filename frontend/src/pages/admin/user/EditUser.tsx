import { useParams } from 'react-router-dom';
import {
  useGetUserByIdQuery,
} from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { UserType } from '../../../interfaces/UserType';
import EmptyView from '../../errors/EmptyView';
import Profile from '../../public/Profile';

export default function EditUser() {
  const { id } = useParams();

  const { data, isLoading } = useGetUserByIdQuery(Number(id));

  if (isLoading) return <Loader />;
  const user = data?.data.user as UserType;
  if (!user) return <EmptyView title="User not found" code={404} />;

  return <Profile user={user} />;
}
