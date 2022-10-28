import {
  Email, Password,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Button, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';

import Logo from '../../assets/images/Logo.png';

export default function SignupView() {
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
        <h2>Conversational App</h2>
      </Stack>
      <Stack spacing={2}>
        <TextField
          label="Full Name"
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
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Password />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Password />
              </InputAdornment>
            ),
          }}
        />
        <Button>Sign Up</Button>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight="bold">Already have an account ?</Typography>
          <Typography fontWeight="bold" color="primary"> Login</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
