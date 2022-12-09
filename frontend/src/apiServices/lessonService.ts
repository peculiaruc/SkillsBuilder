import api from '.';
import {
  GetCourseLessonRequest,
  CourseLessonType,
  CreateCourseLessonRequest,
  UpdateLessonRequest,
  UpdateLessonResponse,
  DeleteLessonResponse,
  GetLessonResponse,
  CreateCourseLessonResponse,
} from '../interfaces/LessonType';
import { CourseId } from '../interfaces/CourseType';
import { ResponseType } from '../interfaces/ResponseType';

const lessonService = api.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation<GetLessonResponse, CreateCourseLessonResponse>({
      query: (assignment) => ({ url: '/lesson/create', method: 'POST', data: assignment }),
      // invalidatesTags: ['USER_ASSIGNMENTS'],
    }),
    updateLesson: builder.mutation<GetLessonResponse, UpdateLessonRequest>({
      query: ({ id, ...data }) => ({ url: `/lesson/${id}`, method: 'PUT', data }),
      // invalidatesTags: ['USER_ASSIGNMENTS'],
    }),
    getLessonById: builder.query<GetLessonResponse, number>({
      query: (id) => ({ url: `/lesson/${id}`, method: 'GET' }),
      // providesTags: ['USER_ASSIGNMENTS'],
    }),
    getCourseLessons: builder.query<CreateCourseLessonResponse, GetCourseLessonRequest>({
      query: (id) => ({ url: `/course/${id}/lessons`, method: 'GET' }),
    }),

    deleteLesson: builder.mutation<ResponseType, number>({
      query: (id) => ({ url: `/lesson/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetLessonByIdQuery,
  useDeleteLessonMutation,
  useGetCourseLessonsQuery,
  useUpdateLessonMutation,
} = lessonService;

export default lessonService;
