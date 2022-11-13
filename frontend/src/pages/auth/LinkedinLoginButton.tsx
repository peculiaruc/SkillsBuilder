import { LinkedIn } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { SocialLoginRequest, useLinkedinLoginMutation } from '../../apiServices/authService';
import { LINKEDIN_CLIENT_ID } from '../../configs/app';

function LinkedinLoginButton() {
  const [LinkedInAuth] = useLinkedinLoginMutation();

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
    scope: encodeURI('r_emailaddress,r_liteprofile'),
    state: nanoid(),
  });

  return <LinkedIn fontSize="large" onClick={() => linkedInLogin()} />;
}

export default LinkedinLoginButton;
