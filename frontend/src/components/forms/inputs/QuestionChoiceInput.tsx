import {
  InputAdornment, Switch, TextField, TextFieldProps,
} from '@mui/material';
import { ChoiceType } from '../../../interfaces/AssingmentType';

type OptionInputProps = {
  value: ChoiceType;
  onChange: (values:ChoiceType)=>void
} & Omit<TextFieldProps, 'onChange'>;

function QuestionChoiceInput(props: OptionInputProps) {
  const { value, onChange, ...rest } = props;
  const { isAnswer, name } = value;

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
    const res = { ...value, name: event.target.value } as ChoiceType;
    onChange(res);
    // console.log(event.target.value);
  };

  const handleChangeIsAnswer = (event:React.ChangeEvent<HTMLInputElement>) => {
    const res = { ...value, isAnswer: event.target.value === 'on' } as ChoiceType;
    onChange(res);
    // console.log(event.target.value);
  };

  const endAdornment = (
    <InputAdornment position="end">
      <Switch name="isAnswer" value={isAnswer ? 'on' : 'off'} onChange={handleChangeIsAnswer} />
    </InputAdornment>
  );

  return (
    <TextField
      {...rest}
      label="Choice Name"
      name="name"
      onChange={handleChangeName}
      value={name}
      InputProps={{ endAdornment }}
    />
  );
}

export default QuestionChoiceInput;
