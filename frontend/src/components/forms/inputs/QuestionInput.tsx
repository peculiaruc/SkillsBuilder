import { TextField, Stack } from '@mui/material';
// import { useState } from 'react';
// import { QuestionType } from '../../../interfaces/AssingmentType';
// props: Omit<QuestionType, 'id' | 'create_at' | 'updated_at'>
function QuestionInput() {
  // const { question, choices } = props;

  //  const [answers, setAnswers] = useState(choices);
  // console.log(question, answers, setAnswers);

  return (
    <Stack>
      <TextField label="Question Name" />
    </Stack>

  );
}

export default QuestionInput;
