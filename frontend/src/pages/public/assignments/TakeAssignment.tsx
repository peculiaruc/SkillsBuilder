/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Divider,
  Step, StepContent, Stepper,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAssignmentQuestionsQuery, useSubmitAssignmentMutation } from '../../../apiServices/assignmentService';
import Loader, { LoaderButton } from '../../../components/Loader';
import { AssignmentType, SubmissionType, SubmitAssignmentRequest } from '../../../interfaces/AssignmentType';
import { QuestionType } from '../../../interfaces/QuestionType';
import { useAnswers } from '../../../store/answerReducer';
import { useAuth } from '../../../store/authReducer';
import grade from '../../../utils/grade';
import DisplayResult from './DisplayResult';
import QuestionAnswerForm from './QuestionAnswerForm';

type Props = {
  assignment: AssignmentType,
  onClose: () => void
};

export default function TakeAssignment({ assignment, onClose }: Props) {
  const answers = useAnswers();
  const { passing_score } = assignment;
  const { user } = useAuth();
  const { id } = useParams();
  const [submitAssignment, { isLoading: isSubmitting }] = useSubmitAssignmentMutation();
  const [step, setStep] = useState<number>(0);
  const [message, setMessage] = useState<SubmissionType>();
  const { data, isLoading } = useGetAssignmentQuestionsQuery(assignment.id);
  if (isLoading) return <Loader />;
  const questions = data?.data.assignments as QuestionType[];

  const handleBack = () => setStep(step > 0 ? step - 1 : step);
  const handleNext = () => setStep(step < questions.length ? step + 1 : step);
  const handleReset = () => setStep(0);
  const handleSubmit = async () => {
    const checkAnswer = questions.filter((question) => {
      const a = answers.find((answer) => answer.question_id === question.id);
      if (!a) return false;
      const choices = question.choices.filter((c) => a.choices.includes(c.name) && c.isAnswer);
      return choices.length === a.choices.length;
    });
    let maxPoints = 0;
    checkAnswer.forEach((answer) => {
      maxPoints += answer.marks;
    });
    const submission = {
      assignment_id: assignment.id,
      grade: grade((maxPoints / passing_score) * 100),
      status: maxPoints >= passing_score ? 'Passed' : 'Failed',
      user_id: user.id,
      course_id: id,
      answers,
    } as unknown as SubmissionType;
    const res = await submitAssignment(submission as unknown as SubmitAssignmentRequest).unwrap();
    toast(res.message);
    setMessage(submission);
  };

  return !message ? (
    <>
      <Stepper activeStep={step} orientation="vertical">
        {questions.map((question: QuestionType, key) => (
          <Step key={key}>
            <StepContent>
              <QuestionAnswerForm
                question={question}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {step === questions.length && (
      <>
        <Button onClick={handleReset} disabled={isSubmitting}>Review Your Answer</Button>
        <Divider>Or</Divider>
        {isSubmitting ? <LoaderButton /> : (
          <Button
            onClick={handleSubmit}
          >
            Submit Your Answer
          </Button>
        )}
      </>
      )}
    </>
  ) : <DisplayResult submission={message} onClose={onClose} />;
}
