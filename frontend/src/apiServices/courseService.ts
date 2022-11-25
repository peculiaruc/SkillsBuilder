import api from '.';
import {
  CourseItem, EnrolledCourseResponseType, EnrolledCourseType, EnrollInCourseResponse,
} from '../interfaces/Course';

export type GetAllCoursesResponse = {
  status: string,
  error?: string,
  data: {
    totalCourses: number,
    courses: CourseItem[]
  }
};

type GetCourseResponse = {
  status: string,
  error: string,
  data: CourseItem
};

type GetCourseRequest = Partial<CourseItem>;

type UserId = {
  user_id:number
};

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<GetCourseResponse, GetCourseRequest>({
      query: (course) => ({ url: '/admin/create-course', method: 'POST', data: course }),
      invalidatesTags: ['LIST_ALL_COURSES'],
    }),
    updateOneCourse: builder.mutation<GetCourseResponse, GetCourseRequest>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
    }),
    getCourseById: builder.query<GetCourseResponse, number>({
      query: (id) => ({ url: `/course/${id}`, method: 'POST' }),
    }),
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => ({ url: '/course/courses', method: 'GET' }),
      providesTags: ['LIST_ALL_COURSES'],
    }),
    deleteOneCourse: builder.mutation({
      query: (course_id) => ({ url: '/course/delete-course', method: 'POST', data: { course_id } }),
    }),
    enrolleInOneCourse: builder.mutation<EnrollInCourseResponse, Partial<EnrolledCourseType>>({
      query: (data) => ({ url: '/course/enroll-in-course', method: 'POST', data }),
      invalidatesTags: ['AllEnrolledCourses', 'LIST_ALL_COURSES'],
    }),
    getEnrolledCourses: builder.query<EnrolledCourseResponseType, UserId>({
      query: (data) => ({ url: '/course/enrolled-courses', method: 'POST', data }),
      providesTags: ['AllEnrolledCourses'],
    }),
  }),
});

export const {
  useEnrolleInOneCourseMutation,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useDeleteOneCourseMutation,
  useUpdateOneCourseMutation,
  useGetEnrolledCoursesQuery,
  useGetAllCoursesQuery,
} = courseService;

export default courseService;
