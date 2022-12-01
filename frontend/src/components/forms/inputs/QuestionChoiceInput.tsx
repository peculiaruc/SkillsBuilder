import { AddOutlined, RemoveCircle } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment, Switch, TextField, TextFieldProps, Stack,
} from '@mui/material';
import { ChoiceType } from '../../../interfaces/AssingmentType';

type OptionInputProps = {
  value: ChoiceType[];
  name:string,
} & TextFieldProps;

function QuestionChoiceInput(props: OptionInputProps) {
  const {
    value, name, onChange, ...rest
  } = props;

  const template = { isAnswer: false, name: '' } as ChoiceType;

  const choices: ChoiceType[] = value ?? [template];

  const send = (
    data:ChoiceType[],
  ) => {
    if (onChange) {
      const target = { target: { value: data, name } } as unknown;
      const event = target as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const addChoice = () => send([...choices, template]);

  const removeChoice = (
    index: number,
  ) => send(choices.filter((_, id) => id !== index));

  const handleChangeName = (
    event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index:number,
  ) => {
    const allChoices = choices;
    allChoices[index] = { ...choices[index], name: event.target.value };
    send(allChoices);
  };
  const handleChangeSwitch = (
    checked: boolean,
    index:number,
  ) => {
    const allChoices = choices;
    allChoices[index] = { ...choices[index], isAnswer: checked };
    send(allChoices);
  };

  return (
    <Stack spacing={2} paddingLeft={2}>
      {choices.map((choice:ChoiceType, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Stack direction="row" spacing={0.25} alignItems="center" key={`key${index}`} sx={{ width: '100%' }}>
          <TextField
            {...rest}
            fullWidth
            label="Choice Name"
            name="name"
            onChange={(e) => handleChangeName(e, index)}
            value={choice.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Switch
                    name="isAnswer"
                    value={choice.isAnswer ? 'on' : 'off'}
                    onChange={(e, checked) => handleChangeSwitch(checked, index)}
                  />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={index === 0 ? addChoice : () => removeChoice(index)}>
            {index === 0 ? <AddOutlined color="primary" /> : <RemoveCircle color="error" />}
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
}

export default QuestionChoiceInput;
