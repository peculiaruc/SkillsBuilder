export interface AssignmentType {
  id:number;
  course_id: number;
  author_id: number;
  description: string;
  title: string;
  passing_score: number;
  max_attemps: number;
  deadline: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ChoiceType {
  id:number;
  name: string;
  isAnswer: boolean;
  created_at: Date;
  updated_at: Date;
}
/*

export interface QuestionType {
  id:number;
  question: string;
  assignment_id: number;
  choices: number[];
  answers: number[];
  mark: number;
  created_at: Date;
  updated_at: Date;
} 7

*/

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

/**
 * When a user submit an answer
 */
export interface AnswerType {
  id:number;
  question_id: number;
  answers: ChoiceType[];
  created_at: Date;
  updated_at: Date;
}

/**
 * Assignment request type and Response type
 */
export type CreateAssignmentRequest = Omit<AssignmentType, 'created_at' | 'updated_at' | 'id'>;

export type UpdateAssignmentRequest = AssignmentType;

export type CreateAssignmentResponse = {
  message: string,
  status: string,
  data: {
    assignment: AssignmentType[]
  }
};

export type GetAssignmentResponse = {
  message: string,
  status: string,
  data: AssignmentType
};

export type GetAssignmentsResponse = {
  message: string,
  status: string,
  data: {
    assignments: AssignmentType[]
  },
};

export type GetCourseAssignmentRequest = {
  course_id: number,
};

export type DeleteAssignmentRequest = {
  assignment_id: number,
};

export type SubmitAssignmentRequest = {
  assignment_id: number,
  user_id: number,
  answers: Omit<AnswerType, 'id' | 'created_at' | 'updated_at'>[],
};
/*
export type SubmitAssignmentResponse = {
  assignment_id: number,
  user_id: number,
  answers: number[],
};
*/

export type GetAssignmentQuestionsRequest = {
  assignment_id: number,
};

export type GetAssignmentSubmissionsRequest = {
  assignment_id: number,
  user_id: number,
};

export type GetAssignmentQuestionsResponse = {
  message: string,
  status: string,
  data: {
    questions: QuestionType[]
  },
};
