import api from '.';
import { CourseItem } from '../interfaces/Course';

export type GetAllType = {
  status: string,
  error?: string,
  data?: {
    totalCourses: number,
    courses: CourseItem[]
  }
};

type GetOneType = {
  status: string,
  error?: string,
  data?: CourseItem
};

type EnrollInCourseRequest = {
  user_id: string,
  course_id: string,
  course_name: string
};

type UserId = {
  user_id:string
};

const courseService = api.injectEndpoints({
  endpoints: (builder) => ({
    createOneCourse: builder.mutation<GetOneType, Partial<CourseItem>>({
      query: (course) => ({ url: '/course/create', method: 'POST', data: course }),
    }),
    updateOneCourse: builder.mutation<GetOneType, Partial<CourseItem>>({
      query: (course) => ({ url: `/course/${course.id}`, method: 'PUT', data: course }),
    }),
    getOneCourse: builder.query<GetOneType, string>({
      query: (id) => ({ url: `/course/${id}`, method: 'GET' }),
    }),
    getAllCourse: builder.query<GetAllType, void>({
      query: () => ({ url: '/course/courses', method: 'GET' }),
    }),
    deleteOneCourse: builder.mutation({
      query: (id) => ({ url: `/course/${id}`, method: 'DELETE' }),
    }),
    enrolleInOneCourse: builder.mutation<EnrollInCourseRequest, GetOneType>({
      query: (data) => ({ url: '/course/enroll-in-course', method: 'POST', data }),
    }),
    getEnrolledCourses: builder.query<GetAllType, UserId>({
      query: (data) => ({ url: '/course/enrolled-courses', method: 'POST', data }),
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
  useGetAllCourseQuery,
} = courseService;

export default courseService;
