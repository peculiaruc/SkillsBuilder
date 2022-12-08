import { FormikValues } from 'formik';
import { toast } from 'react-toastify';
import {
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from '../../apiServices/userService';
import MixedForm from '../../components/forms/MixedForm';
import TabView from '../../components/TabView';
import { UserType } from '../../interfaces/UserType';
import UserMeta from '../../models/UserMeta';
import UserPassword from '../../models/UserPassword';
import UserSocialNetwork from '../../models/UserSocialNetwork';
import { useAuth } from '../../store/authReducer';

type Props = {
  user?: UserType
};

export default function Profile({ user: _user } : Props) {
  const auth = useAuth();
  const user = _user ?? auth.user;
  const [updateUser] = useUpdateUserMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const resetPasswordMutation = async ({ email, password }: FormikValues) => {
    const resetResponse = await resetPassword(email).unwrap();
    if (resetResponse.data.user_id) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id, reset_token } = resetResponse.data;
      const res = await updatePassword({
        resetToken: reset_token,
        password,
        user_id,
      }).unwrap();
      toast(res.message);
    }
  };

  return (
    <TabView
      title={user.fullname}
      tabs={[
        {
          name: 'Me',
          component: (
            <MixedForm
              title="Update your personal info"
              model={new UserMeta(user)}
              dialog={false}
              mutation={updateUser}
              cancelBtn={false}
            />),
        },
        {
          name: 'Social Networks',
          component: (
            <MixedForm
              title="Update your social networks"
              model={new UserSocialNetwork(user)}
              dialog={false}
              mutation={updateUser}
              cancelBtn={false}
            />),
        },
        {
          name: 'Password Setting',
          component: (
            <MixedForm
              title="Reset your password"
              model={new UserPassword({ email: user.email })}
              dialog={false}
              mutation={resetPasswordMutation}
              cancelBtn={false}
            />),
        },
      ]}
    />
  );
}
