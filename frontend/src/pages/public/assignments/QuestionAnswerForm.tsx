import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import AnswerType from '../../../interfaces/AnswerType';
import { QuestionType } from '../../../interfaces/QuestionType';
import { updateAnswer, useAnswers } from '../../../store/answerReducer';

type Props = {
  question: QuestionType,
  handleBack?: ()=>void,
  handleNext?: ()=>void
};

export default function QuestionAnswerForm({ question: q, handleNext, handleBack } : Props) {
  const {
    question, type, choices, marks, id,
  } = q;

  const dispatch = useDispatch();

  const answers = useAnswers();
  const answer = answers.find((a) => a.question_id === id) ?? {
    question_id: id,
    choices: [],
  };

  const handleRadioChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const data = { question_id: id, choices: [value] } as AnswerType;
    dispatch(updateAnswer(data));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const choice = checked ? [...answer.choices, event.target.value] : answer.choices.filter(
      (c:string) => c !== event.target.value,
    );
    dispatch(updateAnswer({ question_id: id, choices: choice }));
  };

  return (
    <Stack spacing={2}>
      <Typography fontWeight="bold">
        {question}
&nbsp;&nbsp;
        <b>
          (
          {marks}
          Marks)
        </b>
      </Typography>
      <Divider />
      <FormControl>
        {
        type === 'single-choice' ? (
          <RadioGroup
            onChange={handleRadioChange}
            defaultValue={answer.choices?.[0]}
          >
            {choices.map((choice) => (
              <FormControlLabel
                key={choice.name}
                value={choice.name}
                control={<Radio />}
                label={choice.name}
              />
            ))}
          </RadioGroup>
        ) : (
          <FormGroup>
            {choices.map((choice) => (
              <FormControlLabel
                key={choice.name}
                value={choice.name}
                control={(
                  <Checkbox
                    name={choice.name}
                    value={choice.name}
                    checked={answer.choices.includes(choice.name)}
                    onChange={handleCheckboxChange}
                  />
)}
                label={choice.name}
              />
            ))}
          </FormGroup>
        )
        }
      </FormControl>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </Stack>
  );
}
