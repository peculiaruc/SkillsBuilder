import { TextField, TextFieldProps } from '@mui/material';
import { ChoiceType } from '../../../interfaces/AssignmentType';
import QuestionChoiceInput from './QuestionChoiceInput';

type Props = { name:string } & TextFieldProps;

function MixedInput(props: Props) {
  const { type, value } = props;
  switch (type) {
    case 'question_choices':
      return <QuestionChoiceInput {...props} value={value as ChoiceType[]} />;
    default:
      return <TextField {...props} fullWidth />;
  }
}

export default MixedInput;
