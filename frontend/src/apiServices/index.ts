import { createApi } from '@reduxjs/toolkit/query/react';
import appConfig from '../configs/app';
import axiosBaseQuery from '../configs/axiosBaseQuery';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: appConfig.apiPath }),
  endpoints: (builder) => ({
    hello: builder.query({
      query: () => ({ url: 'hello-world', method: 'GET' }),
    }),
  }),
});

export default api;
