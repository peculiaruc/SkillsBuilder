import api from '.';
import {
  CreateGroupRequest,
  CreateGroupResponse,
  DeleteGroupResponse,
  GetGroupAccessRequestsResponse,
  GetGroupMembersResponse,
  GetGroupPostsResponse,
  GetGroupResponse,
  GetMyGroupsResponse,
  GroupAccessRequestId,
  GroupId,
  JoinGroupRequest,
  JoinGroupType,
  LeaveGroupRequest,
  UpdateGroupRequest,
  UpdateGroupResponse,
} from '../interfaces/GroupTypes';
import { ResponseType } from '../interfaces/ResponseType';
import { UserId } from '../interfaces/UserType';

const groupService = api.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<CreateGroupResponse, CreateGroupRequest>({
      query: (group) => ({ url: '/group/create', method: 'POST', data: group }),
      invalidatesTags: ['LIST_ALL_COURSES', 'MY_GROUPS'],
    }),
    updateGroup: builder.mutation<UpdateGroupResponse, UpdateGroupRequest>({
      query: (group) => ({ url: `/group/${group.id}`, method: 'PUT', data: group }),
      invalidatesTags: ['LIST_ALL_COURSES', 'MY_GROUPS'],
    }),
    getGroupById: builder.query<GetGroupResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}`, method: 'GET' }),
    }),
    getMyGroups: builder.query<GetMyGroupsResponse, UserId>({
      query: (id) => ({ url: `/user/${id}`, method: 'GET' }),
      providesTags: ['MY_GROUPS'],
    }),
    getAllGroups: builder.query<GetMyGroupsResponse, void>({
      query: () => ({ url: '/group/all', method: 'GET' }),
      providesTags: ['LIST_ALL_COURSES'],
    }),
    deleteGroup: builder.mutation<DeleteGroupResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}`, method: 'DELETE' }),
    }),
    joinGroup: builder.mutation<ResponseType, JoinGroupRequest>({
      query: (data) => ({
        url: `/group/${data.group_id}/join`,
        method: 'POST',
        data: { user_id: data.user_id },
      }),
      invalidatesTags: ['LIST_ALL_COURSES', 'MY_GROUPS', 'GROUP_ACCESS_REQUESTS'],
    }),
    leaveGroup: builder.mutation<ResponseType, LeaveGroupRequest>({
      query: (data) => ({
        url: `/group/${data.group_id}/leave`,
        method: 'POST',
        data: { user_id: data.user_id },
      }),
      invalidatesTags: ['LIST_ALL_COURSES', 'MY_GROUPS', 'GROUP_ACCESS_REQUESTS'],
    }),
    getGroupMembers: builder.query<GetGroupMembersResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}/members`, method: 'GET' }),
      providesTags: ['GROUP_MEMBERS'],
    }),
    getGroupPosts: builder.query<GetGroupPostsResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}/posts`, method: 'GET' }),
      providesTags: ['GROUP_POSTS'],
    }),
    getGroupAccessRequests: builder.query<GetGroupAccessRequestsResponse, GroupId>({
      query: (id) => ({ url: `/group/requests/${id}`, method: 'GET' }),
      providesTags: ['GROUP_ACCESS_REQUESTS'],
    }),
    updateGroupAccessRequest: builder.mutation<ResponseType, JoinGroupType>({
      query: (data) => ({ url: `/group/request/${data.id}`, method: 'UPDATE', data }),
      invalidatesTags: ['GROUP_ACCESS_REQUESTS'],
    }),
    deleteGroupAccessRequest: builder.mutation<ResponseType, GroupAccessRequestId>({
      query: (id) => ({ url: `/group/request/${id}`, method: 'DELETE' }),
      invalidatesTags: ['GROUP_ACCESS_REQUESTS'],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useDeleteGroupAccessRequestMutation,
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
  useGetGroupAccessRequestsQuery,
  useGetGroupMembersQuery,
  useGetGroupPostsQuery,
  useGetMyGroupsQuery,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useUpdateGroupAccessRequestMutation,
  useUpdateGroupMutation,
} = groupService;

export default groupService;
