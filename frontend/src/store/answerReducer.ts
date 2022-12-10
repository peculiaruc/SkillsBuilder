import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';
import AnswerType from '../interfaces/AnswerType';

type InitialStateType = {
  answers: AnswerType[],
};

const initialState = {
  answers: [],
} as unknown as InitialStateType;
const answerReducer = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    updateAnswer: (state: InitialStateType, { payload }: PayloadAction<AnswerType>) => {
      const anwsers = state.answers.filter((q:AnswerType) => q.question_id !== payload.question_id);
      state.answers = [...anwsers, payload];
    },
  },
});
export default answerReducer;

export const { updateAnswer } = answerReducer.actions;
export const useAnswers = () => useSelector((state: RootState) => state.answers.answers);
