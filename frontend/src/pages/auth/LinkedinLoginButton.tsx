import { LinkedIn } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { ThreeDots } from 'react-loader-spinner';
import { SocialLoginRequest, useLinkedinLoginMutation } from '../../apiServices/authService';
import { LINKEDIN_CLIENT_ID } from '../../configs/app';
import { usePalette } from '../../theme/theme';

function LinkedinLoginButton() {
  const palette = usePalette();
  const [LinkedInAuth, { isLoading }] = useLinkedinLoginMutation();

  const onSuccessLinkedin = async (code:string) => {
    const redirected = localStorage.getItem('redirected');
    if (!redirected) {
      localStorage.setItem('redirected', '1');
      const data: SocialLoginRequest = {
        code,
        redirect_uri: window.location.origin.concat('/linkedin'),
      };
      await LinkedInAuth(data).unwrap();
    } else {
      localStorage.removeItem('redirected');
    }
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENT_ID,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: onSuccessLinkedin,
    scope: 'r_emailaddress r_liteprofile',
    state: nanoid(),
  });

  return !isLoading ? <LinkedIn fontSize="large" onClick={() => linkedInLogin()} /> : (
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

export default LinkedinLoginButton;
