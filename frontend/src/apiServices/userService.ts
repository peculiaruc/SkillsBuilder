import api from '.';
import { GetMyCoursesResponse } from '../interfaces/CourseType';
import { GetMyGroupsResponse } from '../interfaces/GroupTypes';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  GetAllAdminsResponse,
  GetAllAuthorsResponse,
  GetAllLearnersResponse,
  GetAllUsersResponse,
  GetMyAssignmentsResponse,
  GetUserPostsResponse,
  GetUserResponse,
  UpdateUserResponse,
  UserId,
  UserType,
} from '../interfaces/UserType';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (user) => ({ url: '/user/create', method: 'POST', data: user }),
      invalidatesTags: ['LIST_ALL_USERS'],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UserType>({
      query: (user) => ({ url: `/user/${user.id}`, method: 'PUT', data: user }),
      invalidatesTags: ['LIST_ALL_USERS'],
    }),
    getUserById: builder.query<GetUserResponse, UserId>({
      query: (id) => ({ url: `/user/${id}`, method: 'GET' }),
    }),
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => ({ url: '/user/all', method: 'GET' }),
      providesTags: ['LIST_ALL_USERS'],
    }),
    deleteUser: builder.mutation<DeleteUserResponse, UserId>({
      query: (id) => ({ url: `/user/${id}`, method: 'DELETE' }),
    }),
    getUserPosts: builder.query<GetUserPostsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/posts`, method: 'GET' }),
      providesTags: ['USER_POSTS'],
    }),
    getUserGroups: builder.query<GetMyGroupsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/mygroups`, method: 'GET' }),
      providesTags: ['USER_GROUPS'],
    }),
    getUserAssignments: builder.query<GetMyAssignmentsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/myassignments`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getUserCourses: builder.query<GetMyCoursesResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/mycourses`, method: 'GET' }),
      providesTags: ['USER_COURSES'],
    }),
    getAllLearners: builder.query<GetAllLearnersResponse, void>({
      query: () => ({ url: '/user/learners/all', method: 'GET' }),
      providesTags: ['ALL_LEARNERS'],
    }),
    getAllAuthors: builder.query<GetAllAuthorsResponse, void>({
      query: () => ({ url: '/user/authors/all', method: 'GET' }),
      providesTags: ['ALL_AUTHORS'],
    }),
    getAllAdmins: builder.query<GetAllAdminsResponse, void>({
      query: () => ({ url: '/user/admins/all', method: 'GET' }),
      providesTags: ['ALL_ADMINS'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetUserAssignmentsQuery,
  useGetUserCoursesQuery,
  useGetUserGroupsQuery,
  useGetUserPostsQuery,
} = userService;

export default userService;
