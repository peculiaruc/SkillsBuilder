import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

interface InitialStateType {
  open: boolean;
}

type ReducerState = {
  form: InitialStateType
};

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

export const useFormState = () => useSelector((state:ReducerState) => state.form.open);
export const { openDialog, closeDialog } = dialogFormReducer.actions;
// export const useDialogForm = () => useDispatch()(openDialog(payload));
export default dialogFormReducer;
