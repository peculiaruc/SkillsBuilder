import { TextField, TextFieldProps } from '@mui/material';
import QuestionInput, { QuestionProps } from './QuestionInput';

type Props = TextFieldProps;

function MixedInput(props: Props) {
  const { type, value } = props;
  switch (type) {
    case 'question':
      return <QuestionInput {...props} value={value as QuestionProps} />;
    default:
      return <TextField {...props} fullWidth />;
  }
}

export default MixedInput;
