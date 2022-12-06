import { createApi } from '@reduxjs/toolkit/query/react';
import appConfig from '../configs/app';
import axiosBaseQuery from '../configs/axiosBaseQuery';

const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Users',
    'Course',
    'AllEnrolledCourses',
    'LIST_ALL_COURSES',
    'LIST_ALL_LESSONS',
    'COURSE_LEARNERS',
    'COURSE_MATERIALS',
    'COURSE_ASSIGNMENTS',
    'GROUP_POSTS',
    'GROUP_MEMBERS',
    'MY_GROUPS',
    'GROUP_ACCESS_REQUESTS',
    'LIST_ALL_USERS',
    'USER_POSTS',
    'USER_GROUPS',
    'USER_ASSIGNMENTS',
    'USER_COURSES',
    'ALL_LEARNERS',
    'ALL_AUTHORS',
    'ALL_ADMINS',
  ],
  baseQuery: axiosBaseQuery({ baseUrl: appConfig.apiPath }),
  endpoints: (builder) => ({
    hello: builder.query({
      query: () => ({ url: 'hello-world', method: 'GET' }),
    }),
  }),
});

export default api;
