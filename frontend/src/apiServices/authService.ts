import { UserInterface, AuthInterface } from '../interfaces/User';
import api from '.';

export interface Response {
  status: string,
  error?: string,
  data?: {
    token: string | undefined,
    user: Partial<UserInterface> | undefined
  }
}

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response, AuthInterface>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', data: credentials }),
    }),
    register: builder.mutation<Response, UserInterface>({
      query: (user) => ({ url: '/auth/register', method: 'POST', data: user }),
    }),
    logout: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    googleLogin: builder.mutation({
      query: (user) => ({ url: '/auth/google', method: 'POST', data: user }),
    }),
    linkedinLogin: builder.mutation({
      query: (user) => ({ url: '/auth/linkedin', method: 'POST', data: user }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useLinkedinLoginMutation,
} = authService;

export default authService;
