import api from '.';
import { GetAllAssignmentsResponse } from '../interfaces/AssignmentType';
import {
  CourseId,
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseResponse,
  EnrollInCourseRequest,
  EnrollInCourseResponse,
  GetAllCoursesResponse,
  GetCourseMaterialsResponse,
  GetCourseResponse,
  UnEnrollInCourseRequest,
  UnEnrollInCourseResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from '../interfaces/CourseType';
import { GetLessonsResponse } from '../interfaces/LessonType';
import { GetCourseAuthorResponse, GetCourseLearnersResponse } from '../interfaces/UserType';

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<CreateCourseResponse, CreateCourseRequest>({
      query: (course) => ({ url: '/course/create', method: 'POST', data: course }),
      invalidatesTags: ['LIST_ALL_COURSES', 'USER_COURSES'],
    }),
    updateOneCourse: builder.mutation<UpdateCourseResponse, UpdateCourseRequest>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
      invalidatesTags: [{ type: 'Course', id: 'Enrolled' }, 'LIST_ALL_COURSES', 'USER_COURSES'],
    }),
    getCourseById: builder.query<GetCourseResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Course', id }],
    }),
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => ({ url: '/course/all', method: 'GET' }),
      providesTags: ['LIST_ALL_COURSES'],
    }),
    deleteOneCourse: builder.mutation<DeleteCourseResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}`, method: 'DELETE' }),
    }),
    enrollInCourse: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.courseId}/enroll`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: (_res, _err, { courseId }) => [{ type: 'Course', id: 'Enrolled' }, { type: 'Course', id: courseId }],
    }),
    unEnrollInCourse: builder.mutation<UnEnrollInCourseResponse, UnEnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.courseId}/unenroll`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses'],
    }),
    getCourseLearners: builder.query<GetCourseLearnersResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/learners`, method: 'GET' }),
      providesTags: ['COURSE_LEARNERS', { type: 'Course', id: 'Enrolled' }],
    }),
    getCourseAssigments: builder.query<GetAllAssignmentsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/assignments`, method: 'GET' }),
      providesTags: ['COURSE_ASSIGNMENTS'],
    }),
    getCourseMaterials: builder.query<GetCourseMaterialsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/materials`, method: 'GET' }),
      providesTags: ['COURSE_MATERIALS'],
    }),
    getCourseAuthor: builder.query<GetCourseAuthorResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/author`, method: 'GET' }),
    }),
    getCourseLessons: builder.query<GetLessonsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/lessons`, method: 'GET' }),
      providesTags: [{ type: 'Lesson', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useDeleteOneCourseMutation,
  useUpdateOneCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseAssigmentsQuery,
  useGetCourseAuthorQuery,
  useGetCourseLearnersQuery,
  useGetCourseMaterialsQuery,
  useUnEnrollInCourseMutation,
  useEnrollInCourseMutation,
  useGetCourseLessonsQuery,
} = courseService;

export default courseService;
