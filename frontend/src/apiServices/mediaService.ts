import {
  GetMediaResponse,
  CreateMediaResponse,
  CreateMediaRequest,
  UpdateMediaResponse,
  MediaId,
  DeleteMediaResponse,
  MediaType,
} from '../interfaces/MediaType';
import api from '.';

const mediaService = api.injectEndpoints({
  endpoints: (builder) => ({
    createMedia: builder.mutation<CreateMediaResponse, CreateMediaRequest>({
      query: (data) => ({ url: '/media/create', method: 'POST', data }),
      invalidatesTags: [{ type: 'Media', id: 'LIST' }],
    }),
    updateMedia: builder.mutation<UpdateMediaResponse, MediaType>({
      query: ({ id, ...data }) => ({ url: `/media/${id}`, method: 'PUT', data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Media', id: 'LIST' }, { type: 'Media', id }],
    }),
    getMediaById: builder.query<GetMediaResponse, MediaId>({
      query: (id) => ({ url: `/media/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Media', id }],
    }),
    deleteMedia: builder.mutation<DeleteMediaResponse, MediaId>({
      query: (id) => ({ url: `/media/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Media', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateMediaMutation,
  useGetMediaByIdQuery,
  useDeleteMediaMutation,
  useUpdateMediaMutation,
} = mediaService;

export default mediaService;
