import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import authService, { LoginResponseType } from '../apiServices/authService';
import { UserType } from '../interfaces/User';

type AuthState = {
  token: string
  user: UserType
};

type ReducerState = {
  auth: AuthState
};

const initialState: AuthState = JSON.parse(localStorage.getItem('user') as string) || { user: undefined, token: undefined };

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        authService.endpoints.login.matchFulfilled,
        (state, { payload }: { payload: LoginResponseType }) => {
          const user = payload.data;
          localStorage.setItem('user', JSON.stringify(user));
          return payload.data;
        },
      )
      .addMatcher(
        authService.endpoints.register.matchFulfilled,
        (state, { payload }: { payload: LoginResponseType }) => payload.data,
      )
      .addMatcher(authService.endpoints.logout.matchFulfilled, () => initialState);
  },
});

export const useAuth = () => useSelector((state: ReducerState) => state.auth);

export default authReducer;
