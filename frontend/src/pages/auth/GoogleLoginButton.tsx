import { Google } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { ThreeDots } from 'react-loader-spinner';
import { nanoid } from 'nanoid';
import { SocialLoginRequest, useGoogleLoginMutation } from '../../apiServices/authService';
import { usePalette } from '../../theme/theme';

function GoogleLoginButton() {
  const palette = usePalette();

  const [authWithGoogle, { isLoading }] = useGoogleLoginMutation();

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

  return !isLoading ? <Google fontSize="large" onClick={() => GoogleLogin()} /> : (
    <ThreeDots
      height="20"
      width="100%"
      radius="9"
      color={palette.primary.main}
      ariaLabel="three-dots-loading"
      visible
    />
  );
}

export default GoogleLoginButton;
