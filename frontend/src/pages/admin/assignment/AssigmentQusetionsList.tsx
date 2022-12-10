import { Container, Stack } from '@mui/material';
import { useGetAssignmentQuestionsQuery } from '../../../apiServices/assignmentService';
import { useCreateQuestionMutation, useUpdateQuestionMutation } from '../../../apiServices/questionService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { QuestionType } from '../../../interfaces/QuestionType';
import Question from '../../../models/Question';
import { useAssignment } from '../../../store/assignmentReducer';
import QuestionTitleForm from './QuestionTitleForm';

export default function AssigmentQusetionsList() {
  const { id } = useAssignment();
  const [updateQuestion, { isLoading: updateStatus }] = useUpdateQuestionMutation();
  const [createQuestion, { isLoading: createStatus }] = useCreateQuestionMutation();
  const { data, isLoading } = useGetAssignmentQuestionsQuery(id);
  if (isLoading) return <Loader />;
  const questions = data?.data.assignments as QuestionType[];

  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <Container maxWidth="md">
        <MixedForm
          dialog
          model={new Question({ assignment_id: id })}
          mutation={createQuestion}
          title="Create Question"
          loading={createStatus}
        />
        <Stack spacing={2}>
          {questions && questions.map((question: QuestionType) => (
            <MixedForm
              dialog={false}
              title={<QuestionTitleForm question={question} />}
              key={question.id}
              model={new Question({ ...question })}
              mutation={updateQuestion}
              cancelBtn={false}
              loading={updateStatus}
            />
          ))}
        </Stack>
      </Container>
    </Stack>
  );
}
