import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';

interface InitialStateType {
  open: boolean;
}

const dialogFormReducer = createSlice({
  name: 'form',
  initialState: {
    open: false,
  },
  reducers: {
    openDialog: (state:InitialStateType) => {
      const currentState = state;
      currentState.open = true;
    },
    closeDialog: (state:InitialStateType) => {
      const currentState = state;
      currentState.open = false;
    },
  },
});

export const useFormState = () => useSelector((state:RootState) => state.form.open);
export const { openDialog, closeDialog } = dialogFormReducer.actions;
// export const useDialogForm = () => useDispatch()(openDialog(payload));
export default dialogFormReducer;
