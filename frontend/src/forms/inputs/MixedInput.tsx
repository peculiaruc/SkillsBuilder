import { TextField, TextFieldProps } from '@mui/material';

function MixedInput(props: TextFieldProps) {
  const { type } = props;

  console.log(type);

  return <TextField {...props} fullWidth />;
}

export default MixedInput;
