import { Google } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { nanoid } from 'nanoid';
import { SocialLoginRequest, useGoogleLoginMutation } from '../../apiServices/authService';

function GoogleLoginButton() {
  const [authWithGoogle] = useGoogleLoginMutation();

  const onSuccess = async (data: Partial<SocialLoginRequest>) => {
    await authWithGoogle({
      ...data,
      redirect_uri: window.location.origin,
      state: nanoid(),
    }).unwrap();
  };

  const GoogleLogin = useGoogleLogin({
    onSuccess,
    flow: 'auth-code',
  });

  return <Google fontSize="large" onClick={() => GoogleLogin()} />;
}

export default GoogleLoginButton;
