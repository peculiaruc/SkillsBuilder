import {
  Button, InputAdornment, Stack, TextField,
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import Logo from '../../assets/images/Logo.png';

export default function ResetPasswordView() {
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
          label="New Password"
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
          label="Confirm Password"
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button>Submit</Button>
      </Stack>
    </Stack>
  );
}
