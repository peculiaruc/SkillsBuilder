import {
  Email, Google, LinkedIn, Password, Window,
} from '@mui/icons-material';

import {
  Box,
  Button, Checkbox, Divider, FormControlLabel, InputAdornment, Stack, TextField, Typography,
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
        <Divider />
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight="bold">Or sign up with</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              backgroundColor: '#DB4437',
              color: 'white',
              '&:hover': {
                backgroundColor: '#DB4437',
                color: 'white',
              },
            }}
          >
            <Google />
            {' '}
            Google
          </Button>
          <Button
            sx={{
              backgroundColor: '#0077B5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0077B5',
                color: 'white',
              },
            }}
          >
            <LinkedIn />
            {' '}
            LinkedIn
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
