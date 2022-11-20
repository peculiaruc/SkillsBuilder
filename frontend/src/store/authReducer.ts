import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { defaultCookieExpires, userCookie } from '../configs/app';
import authService, { LoginResponseType } from '../apiServices/authService';
import { UserType } from '../interfaces/User';

type AuthState = {
  token: string
  user: UserType
};

type ReducerState = {
  auth: AuthState
};
const auth = Cookies.get(userCookie) as string;

const defaultState: Partial<AuthState> = { token: undefined, user: undefined };

const initialState: AuthState = auth ? JSON.parse(auth) : defaultState;

const login = (state: AuthState, { payload }: { payload: LoginResponseType }) => {
  let currentState = state;
  currentState = payload.data;
  // currentState.user.role = 1;
  Cookies.set(userCookie, JSON.stringify(currentState), {
    expires: defaultCookieExpires,
    domain: window.location.hostname,
    path: '/',
  });
  return currentState;
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addMatcher(authService.endpoints.login.matchFulfilled, login)
      .addMatcher(authService.endpoints.googleLogin.matchFulfilled, login)
      .addMatcher(authService.endpoints.linkedinLogin.matchFulfilled, login)
      .addMatcher(authService.endpoints.logout.matchFulfilled, (state:AuthState) => {
        Cookies.remove(userCookie, {
          domain: window.location.hostname,
          path: '/',
        });
        let currentState = state;
        currentState = defaultState as AuthState;
        return currentState;
      });
  },
});

export const useAuth = () => useSelector((state: ReducerState) => state.auth);

export default authReducer;
