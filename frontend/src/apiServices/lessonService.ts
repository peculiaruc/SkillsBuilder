import api from '.';
import {
  CreateLessonRequest,
  CreateLessonResponse,
  DeleteLessonResponse,
  GetLessonResponse,
  LessonId,
  LessonType, UpdateLessonResponse,
} from '../interfaces/LessonType';

const lessonService = api.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation<CreateLessonResponse, CreateLessonRequest>({
      query: (lesson) => ({ url: '/lesson/create', method: 'POST', data: lesson }),
      invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
    }),
    updateLesson: builder.mutation<UpdateLessonResponse, LessonType>({
      query: ({ id, ...data }) => ({ url: `/lesson/${id}`, method: 'PUT', data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Lesson', id: 'LIST' }, { type: 'Lesson', id }],
    }),
    getLessonById: builder.query<GetLessonResponse, LessonId>({
      query: (id) => ({ url: `/lesson/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Lesson', id }],
    }),
    deleteLesson: builder.mutation<DeleteLessonResponse, LessonId>({
      query: (id) => ({ url: `/lesson/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
    }),
    getLessonContent: builder.query<GetLessonResponse, LessonId>({
      query: (id) => ({ url: `/lesson/${id}/content`, method: 'GET' }),
      providesTags: [{ type: 'Media', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetLessonByIdQuery,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
  useGetLessonContentQuery,
} = lessonService;

export default lessonService;
