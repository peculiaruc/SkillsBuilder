import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { RootState } from '.';
import assignmentService from '../apiServices/assignmentService';
import {
  AssignmentType,
  GetAllAssignmentsResponse,
  GetAssignmentQuestionsResponse,
  GetAssignmentResponse,
} from '../interfaces/AssignmentType';
import { QuestionType } from '../interfaces/QuestionType';

type InitialStateType = {
  assignments: AssignmentType[],
  assignment: AssignmentType,
  questions: QuestionType[]
};

const initialState:InitialStateType = {
  assignments: [],
  assignment: {} as AssignmentType,
  questions: [],
};

const assignmentReducer = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addQuestion: (state:InitialStateType, action: PayloadAction<QuestionType>) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state:InitialStateType, action: PayloadAction<number>) => {
      state.questions = state.questions.filter((c, i) => i !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        assignmentService.endpoints.getAssignmentQuestions.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAssignmentQuestionsResponse>) => {
          state.questions = action.payload.data.assignments ?? [];
        },
      )
      .addMatcher(
        assignmentService.endpoints.getAssignmentById.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAssignmentResponse>) => {
          state.assignment = action.payload.data.assignments;
        },
      ).addMatcher(
        assignmentService.endpoints.getCourseAssignments.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAllAssignmentsResponse>) => {
          state.assignments = action.payload.data.assignments ?? [];
        },
      );
  },
});

export const useAssignment = () => useSelector((state: RootState) => state.assignments.assignment);
export const useQuestions = () => useSelector((state: RootState) => state.assignments.questions);
// eslint-disable-next-line max-len
export const useAssignments = () => useSelector((state: RootState) => state.assignments.assignments);
export const { addQuestion, removeQuestion } = assignmentReducer.actions;
export default assignmentReducer;
