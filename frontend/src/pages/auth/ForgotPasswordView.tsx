import EmailIcon from '@mui/icons-material/Email';
import {
  Button, InputAdornment, Stack, TextField
} from '@mui/material';
import Logo from '../../assets/images/Logo.png';

export default function ForgotPasswordView() {
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
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button>Submit</Button>
      </Stack>
    </Stack>
  );
}
