import api from '.';
import { GetMyCoursesResponse } from '../interfaces/CourseType';
import { GetMyGroupsResponse } from '../interfaces/GroupTypes';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse, GetAllUsersResponse,
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
    getUsersByRole: builder.query<GetAllUsersResponse, string>({
      query: (role) => ({ url: role !== 'all' ? `/user/${role}/all` : '/user/all', method: 'GET' }),
      // eslint-disable-next-line max-len
      // providesTags: (result, err, id) => (result ? [{ type: 'Users', id }] : [{ type: 'Users', id: 'LIST' }]),
      providesTags: ['LIST_ALL_USERS'],
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
} = userService;

export default userService;
