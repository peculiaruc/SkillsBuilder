import api from '.';
import { GetAllAssignmentsResponse } from '../interfaces/AssignmentType';
import { GetMyCoursesResponse } from '../interfaces/CourseType';
import { GetMyGroupsResponse } from '../interfaces/GroupTypes';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse, GetAllLearnersResponse, GetAllUsersResponse,
  GetMyAssignmentsResponse,
  GetUserPostsResponse,
  GetUserResponse,
  ResetPasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
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
      invalidatesTags: ['LIST_ALL_USERS'],
    }),
    getUserPosts: builder.query<GetUserPostsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/posts`, method: 'GET' }),
      providesTags: ['USER_POSTS'],
    }),
    getUserGroups: builder.query<GetMyGroupsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/mygroups`, method: 'GET' }),
      providesTags: ['MY_GROUPS'],
    }),
    getUserAssignments: builder.query<GetMyAssignmentsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/myassignments`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getUserCourses: builder.query<GetMyCoursesResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/mycourses`, method: 'GET' }),
      providesTags: ['USER_COURSES'],
    }),
    getAuthorCourses: builder.query<GetMyCoursesResponse, UserId>({
      query: (id) => ({ url: `/user/authors/${id}/mycourses`, method: 'GET' }),
      providesTags: ['USER_COURSES'],
    }),
    getAuthorAssignments: builder.query<GetAllAssignmentsResponse, UserId>({
      query: (id) => ({ url: `/user/authors/${id}/assignments`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getAuthorLearners: builder.query<GetAllLearnersResponse, UserId>({
      query: (id) => ({ url: `/user/${id}/learners`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getUsersByRole: builder.query<GetAllUsersResponse, string>({
      query: (role) => ({ url: role !== 'all' ? `/user/${role}/all` : '/user/all', method: 'GET' }),
      // eslint-disable-next-line max-len
      // providesTags: (result, err, id) => (result ? [{ type: 'Users', id }] : [{ type: 'Users', id: 'LIST' }]),
      providesTags: ['LIST_ALL_USERS'],
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, string>({
      query: (email) => ({ url: '/auth/password-reset', method: 'POST', data: { email } }),
    }),
    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (data) => ({ url: '/auth/password-update', method: 'POST', data }),
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
  useGetUsersByRoleQuery,
  useGetAuthorCoursesQuery,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetAuthorAssignmentsQuery,
  useGetAuthorLearnersQuery,
} = userService;

export default userService;
