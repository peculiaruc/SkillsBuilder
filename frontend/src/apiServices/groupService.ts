import api from '.';
import {
  CreateGroupRequest,
  CreateGroupResponse,
  DeleteGroupResponse,
  GetAllGroupsResponse,
  GetGroupAccessRequestsResponse,
  GetGroupbyIdResponse,
  GetGroupMembersResponse,
  GetGroupPostsResponse, GroupAccessRequestId, GroupAccessRequestType, GroupId,
  JoinGroupRequest, LeaveGroupRequest,
  UpdateGroupRequest,
  UpdateGroupResponse,
} from '../interfaces/GroupTypes';
import { ResponseType } from '../interfaces/ResponseType';

const groupService = api.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<CreateGroupResponse, CreateGroupRequest>({
      query: (group) => ({ url: '/group/create', method: 'POST', data: group }),
      invalidatesTags: ['LIST_ALL_GROUPS', 'MY_GROUPS', 'USER_GROUPS'],
    }),
    updateGroup: builder.mutation<UpdateGroupResponse, UpdateGroupRequest>({
      query: ({ id, ...data }) => ({ url: `/group/${id}`, method: 'PUT', data }),
      invalidatesTags: ['LIST_ALL_GROUPS', 'MY_GROUPS'],
    }),
    getGroupById: builder.query<GetGroupbyIdResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}`, method: 'GET' }),
      providesTags: ['MY_GROUPS'],
    }),
    getAllGroups: builder.query<GetAllGroupsResponse, void>({
      query: () => ({ url: '/group/all/active', method: 'GET' }),
      providesTags: ['LIST_ALL_GROUPS'],
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
      invalidatesTags: ['LIST_ALL_GROUPS', 'MY_GROUPS', 'GROUP_ACCESS_REQUESTS', 'GROUP_MEMBERS'],
    }),
    leaveGroup: builder.mutation<ResponseType, LeaveGroupRequest>({
      query: (data) => ({
        url: `/group/${data.group_id}/leave`,
        method: 'POST',
        data: { user_id: data.user_id },
      }),
      invalidatesTags: ['LIST_ALL_GROUPS', 'MY_GROUPS', 'GROUP_ACCESS_REQUESTS', 'GROUP_MEMBERS'],
    }),
    getGroupMembers: builder.query<GetGroupMembersResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}/members`, method: 'GET' }),
      providesTags: ['GROUP_MEMBERS'],
    }),
    getGroupPosts: builder.query<GetGroupPostsResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}/posts`, method: 'GET' }),
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    getGroupAccessRequests: builder.query<GetGroupAccessRequestsResponse, GroupId>({
      query: (id) => ({ url: `/group/${id}/requests`, method: 'GET' }),
      providesTags: ['GROUP_ACCESS_REQUESTS'],
    }),
    updateGroupAccessRequest: builder.mutation<ResponseType, GroupAccessRequestType>({
      query: ({ id, ...data }) => ({ url: `/group/requests/${id}`, method: 'PUT', data }),
      invalidatesTags: ['GROUP_ACCESS_REQUESTS'],
    }),
    deleteGroupAccessRequest: builder.mutation<ResponseType, GroupAccessRequestId>({
      query: (id) => ({ url: `/group/requests/${id}`, method: 'DELETE' }),
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
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useUpdateGroupAccessRequestMutation,
  useUpdateGroupMutation,
} = groupService;

export default groupService;
