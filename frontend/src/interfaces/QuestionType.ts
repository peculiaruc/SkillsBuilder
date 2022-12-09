import { ChoiceType } from './AssignmentType';
import { ResponseType } from './ResponseType';

export interface QuestionType {
  id:number;
  question: string;
  mark: number;
  assignment_id: number;
  choices: ChoiceType[];
  type: string,
  created_at: Date;
  updated_at: Date;
}
export type QuestionId = number;

export type CreateQuestionRequest = Omit<QuestionType, 'id' | 'created_at' | 'updated_at'>;

export type CreateQuestionResponse = ResponseType & {
  data: {
    question: QuestionType
  }
};
export type GetQuestionRequest = QuestionId;
export type GetQuestionResponse = CreateQuestionResponse;
export type DeleteQuestionRequest = QuestionId;
export type DeleteQuestionResponse = ResponseType;
export type UpdateQuestionRequest = QuestionType;
export type UpdateQuestionResponse = CreateQuestionResponse;
