import { Typography } from '@mui/material';
import { useGetUserByIdQuery } from '../../apiServices/userService';
import Loader from '../../components/Loader';
import TabView from '../../components/TabView';
import { useAuth } from '../../store/authReducer';
import EmptyView from '../errors/EmptyView';

export default function Profile() {
  const auth = useAuth();
  const { data, isLoading } = useGetUserByIdQuery(auth.user.id);
  if (isLoading) return <Loader />;
  const user = data?.data.user;
  if (!user) return <EmptyView title="User not found" code={404} />;

  return (
    <TabView
      title={user.fullname}
      tabs={[
        { name: 'Me', component: <Typography>User Info</Typography> },
        { name: 'Social Networks', component: <Typography>User Social Update</Typography> },
        { name: 'Password Setting', component: <Typography>User Password reset</Typography> },
      ]}
    />
  );
}
