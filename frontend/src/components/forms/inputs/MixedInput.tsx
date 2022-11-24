import { TextField, TextFieldProps } from '@mui/material';
// import QuestionInput from './QuestionInput';

type Props = TextFieldProps;

function MixedInput(props: Props) {
  const { type } = props;
  switch (type) {
    default:
      return <TextField {...props} fullWidth />;
  }
}

export default MixedInput;
