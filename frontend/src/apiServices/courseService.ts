import api from '.';
import {
  CourseType, EnrollInCourseRequest, EnrollInCourseResponse
} from '../interfaces/Course';

export type GetAllCoursesResponse = {
  status: string,
  error?: string,
  data: {
    totalCourses: number,
    courses: CourseType[]
  }
};

type GetCourseResponse = {
  status: string,
  error: string,
  data: CourseType
};

type GetCourseByIdResponse = {
  status: string,
  error: string,
  data: {
    course: CourseType
  }
};

type GetCourseRequest = Partial<CourseType>;

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<GetCourseResponse, GetCourseRequest>({
      query: (course) => ({ url: '/course/create', method: 'POST', data: course }),
      invalidatesTags: ['LIST_ALL_COURSES'],
    }),
    updateOneCourse: builder.mutation<GetCourseResponse, GetCourseRequest>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
    }),
    getCourseById: builder.query<GetCourseByIdResponse, number>({
      query: (id) => ({ url: `/course/${id}`, method: 'POST' }),
    }),
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => ({ url: '/course/all', method: 'GET' }),
      providesTags: ['LIST_ALL_COURSES'],
    }),
    deleteOneCourse: builder.mutation({
      query: (course_id) => ({ url: `/course/${course_id}`, method: 'POST' }),
    }),
    enrollInOneCourse: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.course_id}/enroll`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    unEnrollInOneCourse: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.course_id}/unenroll`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    getCourseLearners: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.course_id}/learners`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    getCourseAssigments: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.course_id}/learners`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    getCourseAuthor: builder.mutation<EnrollInCourseResponse, EnrollInCourseRequest>({
      query: (data) => ({ url: `/course/${data.course_id}/learners`, method: 'POST', data: { userId: data.userId } }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
  }),
});

export const {
  useEnrollInOneCourseMutation,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useDeleteOneCourseMutation,
  useUpdateOneCourseMutation,
  useGetAllCoursesQuery,
} = courseService;

export default courseService;
