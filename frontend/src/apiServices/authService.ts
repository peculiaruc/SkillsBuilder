import { UserInterface, AuthInterface } from '../interfaces/User';
import api from '.';

export interface Response {
  status:string,
  error?:string,
  data?:{
    token:string | undefined,
    user:Partial<UserInterface> | undefined
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
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authService;

export default authService;
