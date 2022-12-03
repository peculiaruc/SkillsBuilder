import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import assignmentService from '../apiServices/assignmentService';
import {
  AssingmentType, GetAssignmentQuestionsResponse, GetAssignmentsResponse, QuestionType,
} from '../interfaces/AssignmentType';

type InitialStateType = {
  assignments: AssingmentType[],
  questions: QuestionType[]
};

type ReducerState = {
  assignments: InitialStateType
};

const initialState:InitialStateType = {
  assignments: [],
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
          state.questions = action.payload.data.questions ?? [];
        },
      ).addMatcher(
        assignmentService.endpoints.getCourseAssignments.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAssignmentsResponse>) => {
          state.assignments = action.payload.data.assignments ?? [];
        },
      );
  },
});

export const useQuestions = () => useSelector((state: ReducerState) => state.assignments.questions);
export const useAssignments = () => useSelector(
  (state: ReducerState) => state.assignments.assignments,
);
export const { addQuestion, removeQuestion } = assignmentReducer.actions;
export default assignmentReducer;
