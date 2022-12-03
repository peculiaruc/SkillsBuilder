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
import { GetCourseAuthorResponse, GetCourseLearnersResponse } from '../interfaces/UserType';

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<CreateCourseResponse, CreateCourseRequest>({
      query: (course) => ({ url: '/course/create', method: 'POST', data: course }),
      invalidatesTags: ['LIST_ALL_COURSES'],
    }),
    updateOneCourse: builder.mutation<UpdateCourseResponse, UpdateCourseRequest>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    getCourseById: builder.query<GetCourseResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}`, method: 'GET' }),
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
      invalidatesTags: ['AllEnrolledCourses'],
    }),
    unEnrollInOneCourse: builder.mutation<UnEnrollInCourseResponse, UnEnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.courseId}/unenroll`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses'],
    }),
    getCourseLearners: builder.query<GetCourseLearnersResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/learners`, method: 'GET' }),
      providesTags: ['COURSE_LEARNERS'],
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
  useUnEnrollInOneCourseMutation,
  useEnrollInCourseMutation,
} = courseService;

export default courseService;
