import { Button, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAssignmentByIdQuery, useGetAssignmentQuestionsQuery }
  from '../../../apiServices/assignmentService';
import FormBuilder from '../../../components/forms/FormBuilder';
import Question from '../../../models/Question';
import { useAuth } from '../../../store/authReducer';

export default function CreateAssignmentQuestionView() {
  const params = useParams();
  const assignmentId = Number(params.id);
  const auth = useAuth();
  const model = new Question();

  const { data, isLoading } = useGetAssignmentByIdQuery(assignmentId);
  const { data: questions, isLoading: isLoadingA } = useGetAssignmentQuestionsQuery({
    assignment_id: assignmentId,
  });
  if (isLoading || isLoadingA) { return <CircularProgress />; }

  console.log(data, questions);

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 1 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Add Question</Button>
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
        </>
      )}
    </Stack>
  );
}
