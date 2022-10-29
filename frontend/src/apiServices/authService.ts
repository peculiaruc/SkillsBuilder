import { UserInterface, AuthInterface } from '../interfaces/User';
import api from '.';

interface Response {
  status:string,
  error?:string,
  data?:{
    token:string,
    user:Partial<UserInterface>
  }
}

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response, AuthInterface>({
      query: (credentials) => ({ url: 'auth/login', method: 'POST', data: credentials }),
    }),
    register: builder.mutation<Response, UserInterface>({
      query: (user) => ({ url: 'auth/register', method: 'POST', data: user }),
    }),
    logout: builder.query({
      query: () => ({ url: 'auth/logout', method: 'POST' }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authService;
