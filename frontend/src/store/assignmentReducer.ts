import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import assignmentService from '../apiServices/assignmentService';
import {
  AssingmentType, GetAssignmentQuestionsResponse, GetAssignmentsResponse, QuestionType,
} from '../interfaces/AssingmentType';

type InitialStateType = {
  assignments:AssingmentType[],
  questions:QuestionType[]
};

type ReducerState = {
  assignments: InitialStateType
};

const assignmentReducer = createSlice({
  name: 'assignments',
  initialState: {
    assignments: [],
    questions: [],
  },
  reducers: {
    addQuestion: (state:InitialStateType, { payload }:{ payload:QuestionType }) => {
      const currentState = state;
      currentState.questions.push(payload);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        assignmentService.endpoints.getAssignmentQuestions.matchFulfilled,
        (state: InitialStateType, { payload }: { payload: GetAssignmentQuestionsResponse }) => {
          const currenState = state;
          currenState.questions = payload.data.questions;
        },
      ).addMatcher(
        assignmentService.endpoints.getCourseAssignments.matchFulfilled,
        (state: InitialStateType, { payload }: { payload: GetAssignmentsResponse }) => {
          const currenState = state;
          currenState.assignments = payload.data.assignments;
        },
      );
  },
});

export const useQuestions = () => useSelector((state:ReducerState) => state.assignments.questions);
export const useAssignments = () => useSelector(
  (state:ReducerState) => state.assignments.assignments,
);
export const { addQuestion } = assignmentReducer.actions;
export default assignmentReducer;
