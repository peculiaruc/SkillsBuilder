import { Stack } from '@mui/material';
import React from 'react';
import { useGetAssignmentQuestionsQuery } from '../../../apiServices/assignmentService';
import { useUpdateQuestionMutation } from '../../../apiServices/questionService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import { QuestionType } from '../../../interfaces/QuestionType';
import Question from '../../../models/Question';
import CreateAssignmentQuestionView from './CreateAssignmentQuestionView';

type Props = {
  assignment: AssignmentType
};

export default function AssigmentQusetionsList({ assignment } : Props) {
  const { id } = assignment;
  const [updateQuestion] = useUpdateQuestionMutation();
  const { data, isLoading } = useGetAssignmentQuestionsQuery(id);
  if (isLoading) return <Loader />;
  const questions = data?.data.questions as QuestionType[];

  return (
    <Stack spacing={2}>
      {questions && questions.map((question: QuestionType) => (
        <MixedForm
          dialog={false}
          title="Update Question"
          key={question.id}
          model={new Question({ ...question })}
          mutation={updateQuestion}
        />
      ))}
      <CreateAssignmentQuestionView />
    </Stack>
  );
}
