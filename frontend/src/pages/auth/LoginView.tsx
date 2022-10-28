import {
  Email, Google, LinkedIn, Password, Window,
} from '@mui/icons-material';

import {
  Box,
  Button, Checkbox, Divider, FormControlLabel, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';
import Logo from '../../assets/images/Logo.png';

export default function LoginView() {
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
        <Box sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <FormControlLabel sx={{ marginTop: 0 }} control={<Checkbox defaultChecked />} label="Keep me logged in" />
          <Typography fontWeight="bold"> Forgot password ?</Typography>
        </Box>
        <Button>Login</Button>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>
            Don&apos;t have and account ?
          </span>
          <span style={{ fontWeight: 'bold' }}> SignIn ?</span>
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
          <Google fontSize="large" />
          <Window fontSize="large" />
          <LinkedIn fontSize="large" />
        </Stack>
      </Stack>
    </Stack>
  );
}
