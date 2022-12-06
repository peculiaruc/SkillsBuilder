import { Typography } from '@mui/material';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../apiServices/userService';
import MixedForm from '../../components/forms/MixedForm';
import Loader from '../../components/Loader';
import TabView from '../../components/TabView';
import { useAuth } from '../../store/authReducer';
import EmptyView from '../errors/EmptyView';
import UserMeta from '../../models/UserMeta';

export default function Profile() {
  const auth = useAuth();
  const { data, isLoading } = useGetUserByIdQuery(auth.user.id);
  if (isLoading) return <Loader />;
  const user = data?.data.user;
  if (!user) return <EmptyView title="User not found" code={404} />;

  const model = new UserMeta(user);

  return (
    <TabView
      title={user.fullname}
      tabs={[
        {
          name: 'Me',
          component: (
            <MixedForm
              title="Update user info"
              model={model}
              dialog={false}
              useMutation={useUpdateUserMutation}
            />),
        },
        { name: 'Social Networks', component: <Typography>User Social Update</Typography> },
        { name: 'Password Setting', component: <Typography>User Password reset</Typography> },
      ]}
    />
  );
}
