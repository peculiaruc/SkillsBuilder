import {
  Button, InputAdornment, Stack, TextField,
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Logo from '../../assets/images/Logo.png';
import appConfig from '../../configs/app';

export default function ResetPasswordView() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    onSubmit: ({ password, password_confirmation }) => {
      if (password !== password_confirmation) toast('Password not match', { type: 'error' });
      else {
        toast('Password reset successfully', { type: 'success' });
        navigate('/login');
      }
    },
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
        <img src={Logo} alt="Conversational App" />
        <h2>{appConfig.appName}</h2>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            onChange={formik.handleChange}
            name="password"
            label="New Password"
            required
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="confirm_password"
            label="Confirm Password"
            type="password"
            required
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
}
