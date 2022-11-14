import EmailIcon from '@mui/icons-material/Email';
import {
  Button, InputAdornment, Stack, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePasswordResetMutation } from '../../apiServices/authService';
import Logo from '../../assets/images/Logo.png';
import appConfig from '../../configs/app';
import { ResetPasswordRequest } from '../../interfaces/Course';

export default function ForgotPasswordView() {
  const navigate = useNavigate();

  const [resetPassword] = usePasswordResetMutation();

  const onSubmit = async (email: ResetPasswordRequest) => {
    await resetPassword(email).unwrap();
    toast('Password reset link sent to your email account', { type: 'success' });
    navigate('/reset-password');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <Stack spacing={2}>
          <TextField
            onChange={formik.handleChange}
            label="Email Address"
            required
            name="email"
            type="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit">Submit</Button>
        </Stack>

      </Stack>
    </form>
  );
}
