import api from '.';
import {
  CourseItem, EnrolledCourseResponseType, EnrolledCourseType, EnrollInCourseResponse,
} from '../interfaces/Course';

export type GetAllType = {
  status: string,
  error?: string,
  data: {
    totalCourses: number,
    courses: CourseItem[]
  }
};

type GetOneType = {
  status: string,
  error?: string,
  data: CourseItem
};

type UserId = {
  user_id:number
};

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createOneCourse: builder.mutation<GetOneType, Partial<CourseItem>>({
      query: (course) => ({ url: '/create-course', method: 'POST', data: course }),
    }),
    updateOneCourse: builder.mutation<GetOneType, Partial<CourseItem>>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
    }),
    getOneCourse: builder.query<GetOneType, string>({
      query: (id) => ({ url: `/course/${id}`, method: 'GET' }),
      providesTags: ['LIST_ALL_COURSES'],
    }),
    getAllCourses: builder.query<GetAllType, void>({
      query: () => ({ url: '/course/courses', method: 'GET' }),
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
  useCreateOneCourseMutation,
  useGetOneCourseQuery,
  useDeleteOneCourseMutation,
  useUpdateOneCourseMutation,
  useGetEnrolledCoursesQuery,
  useGetAllCoursesQuery,
} = courseService;

export default courseService;
