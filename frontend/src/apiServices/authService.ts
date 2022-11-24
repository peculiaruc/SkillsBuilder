import { ResetPasswordRequest } from '../interfaces/Course';
import { CredentialsType, UserType, UserRegisterType } from '../interfaces/User';
import api from '.';

export type LoginResponseType = {
  status: string,
  error: string,
  data: {
    token: string,
    user: UserType
  }
};

export type SocialLoginRequest = {
  code:string,
  redirect_uri:string,
  scope?:string
};

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, CredentialsType>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', data: credentials }),
    }),
    register: builder.mutation<LoginResponseType, UserRegisterType>({
      query: (user) => ({ url: '/auth/register', method: 'POST', data: user }),
    }),
    logout: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    googleLogin: builder.mutation({
      query: (user) => ({ url: '/social/google', method: 'POST', data: user }),
    }),
    linkedinLogin: builder.mutation({
      query: (data) => ({
        url: '/social/linkedin',
        method: 'POST',
        data,
      }),
    }),
    passwordReset: builder.mutation<void, ResetPasswordRequest>({
      query: (data) => ({ url: '/auth/password-reset', method: 'POST', data }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useLinkedinLoginMutation,
  usePasswordResetMutation,
} = authService;

export default authService;
