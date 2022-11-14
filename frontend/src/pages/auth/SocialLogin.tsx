import { Divider, Stack } from '@mui/material';
import GoogleLoginButton from './GoogleLoginButton';
import LinkedinLoginButton from './LinkedinLoginButton';

function SocialLoginForm() {
  return (
    <>
      <Divider>Or continue with</Divider>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GoogleLoginButton />
        <LinkedinLoginButton />
      </Stack>
    </>
  );
}

export default SocialLoginForm;
