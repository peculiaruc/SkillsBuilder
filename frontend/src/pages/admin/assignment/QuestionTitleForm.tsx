import { RemoveCircle } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useDeleteQuestionMutation } from '../../../apiServices/questionService';
import { QuestionType } from '../../../interfaces/QuestionType';

type Props = {
  question: QuestionType
};
export default function QuestionTitleForm({ question } : Props) {
  const [deleteQuestion] = useDeleteQuestionMutation();
  const handleDeleteQuestion = async () => {
    const res = await deleteQuestion(question.id).unwrap();
    toast(res.message);
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <span>
        Update question
      </span>
      <IconButton onClick={handleDeleteQuestion}>
        <RemoveCircle color="error" />
      </IconButton>
    </Stack>
  );
}
