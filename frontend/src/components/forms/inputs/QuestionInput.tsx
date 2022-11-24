import {
  InputAdornment, Switch, TextField, TextFieldProps,
} from '@mui/material';

export type QuestionProps = {
  name:string,
  isAnswer: boolean,
};

type QuestionInputProps = {
  value: QuestionProps;
} & TextFieldProps;

function QuestionInput(props: QuestionInputProps) {
  const { value, ...rest } = props;
  const { isAnswer, name } = value;

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
  };

  const endAdornment = (
    <InputAdornment position="end">
      <Switch value={isAnswer ? 'on' : 'off'} onChange={handleChange} />
    </InputAdornment>
  );

  return (
    <TextField
      {...rest}
      onChange={handleChange}
      value={name}
      InputProps={{ endAdornment }}
    />
  );
}

export default QuestionInput;
