import api from '.';
import { GetMyCoursesResponse } from '../interfaces/CourseType';
import { GetMyGroupsResponse } from '../interfaces/GroupTypes';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  PostId,
  PostType, UpdatePostResponse,
} from '../interfaces/PostType';

const postService = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: (post) => ({ url: '/post/create', method: 'POST', data: post }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<UpdatePostResponse, PostType>({
      query: ({ id, ...data }) => ({ url: `/post/${id}`, method: 'PUT', data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Post', id: 'LIST' }, { type: 'Post', id }],
    }),
    getPostById: builder.query<GetPostResponse, PostId>({
      query: (id) => ({ url: `/post/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<DeletePostResponse, PostId>({
      query: (id) => ({ url: `/post/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postService;

export default postService;
