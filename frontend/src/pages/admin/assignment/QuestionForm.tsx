import { RemoveCircle } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteQuestionMutation } from '../../../apiServices/assignmentService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { QuestionType } from '../../../interfaces/QuestionType';
import Question from '../../../models/Question';
import { removeQuestion, useQuestions } from '../../../store/assignmentReducer';

export default function QuestionForm() {
  const model = new Question();

  const dispatch = useDispatch();

  const questions = useQuestions();

  const [deleteOneQuestion] = useDeleteQuestionMutation();

  const onSubmit = async (values: FormikValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const deleteQuestion = async (question: QuestionType, index:number) => {
    if (question.id) {
      const res = await deleteOneQuestion(question.id).unwrap();
      toast(res.message);
    } else dispatch(removeQuestion(index));
  };

  return (
    <Stack spacing={2} width="100%">
      {questions && questions.map((question, key) => (
        <FormBuilder
          title={(
            <Stack direction="row" justifyContent="space-between">
              <span>
                {question.id ? 'Update' : 'Adding new'}
                Question
              </span>
              <IconButton onClick={() => deleteQuestion(question, key)}>
                <RemoveCircle color="error" />
              </IconButton>
            </Stack>
)}
          key={key}
          dialog={false}
          model={model}
          onSubmit={onSubmit}
          data={question}
        />
      ))}
    </Stack>
  );
}
