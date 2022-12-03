import { Button, CircularProgress, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetAssignmentByIdQuery, useGetAssignmentQuestionsQuery } from '../../../apiServices/assignmentService';
import { QuestionType } from '../../../interfaces/AssignmentType';
import { addQuestion } from '../../../store/assignmentReducer';
import { useAuth } from '../../../store/authReducer';
import QuestionForm from './QuestionForm';

export default function CreateAssignmentQuestionView() {
  const params = useParams();
  const assignmentId = Number(params.id);
  const auth = useAuth();
  const dispatch = useDispatch();

  const { isLoading } = useGetAssignmentByIdQuery(assignmentId);
  const { isLoading: isLoadingA } = useGetAssignmentQuestionsQuery({
    assignment_id: assignmentId,
  });

  const createEmptyQuestion = () => {
    dispatch(addQuestion({
      question: '',
      mark: 0,
    } as QuestionType));
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
  };

  if (isLoading || isLoadingA) { return <CircularProgress />; }

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 1 && (
        <>
          <QuestionForm />
          <Button sx={{ alignSelf: 'center' }} onClick={createEmptyQuestion}>Add Question</Button>
        </>
      )}
    </Stack>
  );
}
