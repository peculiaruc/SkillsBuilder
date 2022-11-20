export interface AssingmentType {
  id:number;
  course_id: number;
  author_id: number;
  description: string;
  passing_score: number;
  max_attemps: number;
  deadline: Date;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionType {
  id:number;
  question: number;
  assignment_id: number;
  type: string;
  choices: number[];
  answers: number[];
  created_at: Date;
  updated_at: Date;
}
export interface AnswerType {
  id:number;
  question_id: number;
  answers: number[];
  created_at: Date;
  updated_at: Date;
}

/**
 * Assignment request type and Response type
 */
export type CreateAssignmentRequest = Omit<AssingmentType, 'created_at' | 'updated_at' | 'id'>;

export type UpdateAssignmentRequest = AssingmentType;

export type CreateAssignmentResponse = {
  message: string,
  status: string,
  data: {
    assignment: AssingmentType[]
  }
};

export type GetAssignmentResponse = {
  message: string,
  status: string,
  data: AssingmentType
};

export type GetAssignmentsResponse = {
  message: string,
  status: string,
  data: {
    assignments: AssingmentType[]
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
