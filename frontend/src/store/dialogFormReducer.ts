import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type InitialStateType = {
  open:boolean,
  dialog: boolean,
  data: unknown,
};

type ReducerState = {
  form: InitialStateType
};

const dialogFormReducer = createSlice({
  name: 'form',
  initialState: {
    open: false,
    dialog: false,
    data: {},
  },
  reducers: {
    openDialog: (state:InitialStateType, { payload }:{ payload:unknown }) => {
      const currentState = state;
      currentState.open = true;
      currentState.dialog = true;
      currentState.data = payload;
    },
    closeDialog: (state:InitialStateType) => {
      const currentState = state;
      currentState.open = false;
      currentState.dialog = false;
      currentState.data = {};
    },
  },
});

export const useDialog = () => useSelector((state:ReducerState) => state.form);
export const { openDialog, closeDialog } = formReducer.actions;
export default dialogFormReducer;
