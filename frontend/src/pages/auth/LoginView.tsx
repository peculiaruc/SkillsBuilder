import {
  Email, Facebook, Google, LinkedIn, Password,
} from '@mui/icons-material';

import {
  Box,
  Button, Checkbox, Divider, FormControlLabel, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import FacebookAuth from 'react-facebook-auth';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useFacebookLoginMutation, useGoogleLoginMutation, useLinkedinLoginMutation, useLoginMutation,
} from '../../apiServices/authService';
import Logo from '../../assets/images/Logo.png';
import appConfig, { FACEBOOK_APP_ID, LINKEDIN_CLIENT_ID } from '../../configs/app';
import { AuthInterface } from '../../interfaces/User';

const FacebookIcon = (<Facebook fontSize="large" />);

export default function LoginView() {
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const [GoogleAuth] = useGoogleLoginMutation();

  const [LinkedInAuth] = useLinkedinLoginMutation();
 
  const GoogleLogin = useGoogleLogin({
    onSuccess: GoogleAuth,
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENT_ID,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: LinkedInAuth,
  });

  const initialValues: AuthInterface = {
    email: '',
    password: '',
  };

  const onSubmit = async (credentials: AuthInterface) => {
    await login(credentials).unwrap();
    toast('Login successfully', { type: 'success' });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Logo} alt={appConfig.appName} />
        <h2>{appConfig.appName}</h2>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            name="email"
            onChange={formik.handleChange}
            label="Email Address"
            type="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            name="password"
            onChange={formik.handleChange}
            label="Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}
          >
            <FormControlLabel sx={{ marginTop: 0 }} control={<Checkbox defaultChecked />} label="Keep me logged in" />

            <Typography
              onClick={() => navigate('/forgot-password')}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Forgot password ?

            </Typography>

          </Box>
          <Button type="submit">Login</Button>
        </Stack>
      </form>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          Don&apos;t have and account?
        </span>
        <Typography
          onClick={() => navigate('/signup')}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Sign Up
        </Typography>

      </Stack>
      <Divider>Or continue with</Divider>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Google fontSize="large" onClick={() => GoogleLogin()} />
        <LinkedIn fontSize="large" onClick={() => linkedInLogin()} />
       

      </Stack>
    </Stack>
  );
}
