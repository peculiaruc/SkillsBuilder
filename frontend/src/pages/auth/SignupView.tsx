import {
  Email, Password,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Button, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import { useRegisterMutation } from '../../apiServices/authService';
import { UserRegisterType } from '../../interfaces/User';
import appConfig from '../../configs/app';

export default function SignupView() {
  const [signup] = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = async (user: UserRegisterType) => {
    const res = await signup(user).unwrap();
    if (res?.data?.token) navigate('/');
  };

  const initialValues: UserRegisterType = {
    fullname: '',
    email: '',
    city: '',
    password: '',
    rememberMe: false,
    phone: '',
  };
  
  const formik = useFormik({
    initialValues,
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
            label="Full Name"
            name="fullname"
            required
            onChange={formik.handleChange}
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email Address"
            name="email"
            required
            onChange={formik.handleChange}
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
            name="phone"
            required
            onChange={formik.handleChange}
            label="Phone Number"
            type="tel"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="city"
            onChange={formik.handleChange}
            required
            label="City"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            required
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Password />
                </InputAdornment>
              ),
            }}
            name="password"
            onChange={formik.handleChange}
          />
          <TextField
            label="Confirm Password"
            required
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Password />
                </InputAdornment>
              ),
            }}
            name="confirm_password"
            onChange={formik.handleChange}
          />
          <Button type="submit">Sign Up</Button>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>Already have an account ?</span>
            <Typography
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
