import { TextField } from '@mui/material';
import { ChoiceType } from '../../../interfaces/AssignmentType';
import { MuiInputProps } from './InputType';
import QuestionChoiceInput from './QuestionChoiceInput';
import SelectInput from './SelectInput';

function MixedInput(props: MuiInputProps) {
  const { type, value } = props;

  switch (type) {
    case 'select':
      return (<SelectInput {...props} value={value} />);
    case 'question_choices':
      return (
        <QuestionChoiceInput
          {...props}
          value={value as ChoiceType[]}
        />
      );
    default:
      return <TextField {...props} fullWidth />;
  }
}

export default MixedInput;
