import { TextField, TextFieldProps } from '@mui/material';

function MixedInput(props: TextFieldProps) {
  return <TextField {...props} fullWidth />;
}

export default MixedInput;
