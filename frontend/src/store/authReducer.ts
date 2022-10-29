import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import authService, { Response } from '../apiServices/authService';
import { UserInterface } from '../interfaces/User';

interface AuthState {
  token: string | undefined
  user: Partial<UserInterface> | undefined,
}

interface ReducerState {
  auth: AuthState
}

const initialState: AuthState = {
  token: 'undefined',
  user: undefined,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        authService.endpoints.login.matchFulfilled,
        (state, { payload }: { payload: Response }) => payload.data,
      )
      .addMatcher(
        authService.endpoints.register.matchFulfilled,
        (state, { payload }: { payload: Response }) => payload.data,
      )
      .addMatcher(authService.endpoints.logout.matchFulfilled, (state) => initialState);
  },
});

const selectAuth = (state: ReducerState) => state.auth;

export const useAuth = () => useSelector(selectAuth);

export default authReducer;
