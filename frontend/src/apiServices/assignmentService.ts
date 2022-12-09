import api from '.';
import {
  CreateAssignmentRequest,
  GetAllAssignmentsResponse,
  GetAssignmentQuestionsResponse,
  GetAssignmentResponse,
  GetAssignmentSubmissionsRequest,
  SubmitAssignmentRequest,
  UpdateAssignmentRequest,
} from '../interfaces/AssignmentType';
import { CourseId } from '../interfaces/CourseType';
import { ResponseType } from '../interfaces/ResponseType';

const assignmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<GetAssignmentResponse, CreateAssignmentRequest>({
      query: (assignment) => ({ url: '/assignment/create', method: 'POST', data: assignment }),
      invalidatesTags: ['USER_ASSIGNMENTS'],
    }),
    updateAssignment: builder.mutation<GetAssignmentResponse, UpdateAssignmentRequest>({
      query: ({ id, ...data }) => ({ url: `/assignment/${id}`, method: 'PUT', data }),
      invalidatesTags: ['USER_ASSIGNMENTS'],
    }),
    getAssignmentById: builder.query<GetAssignmentResponse, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getCourseAssignments: builder.query<GetAllAssignmentsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/assignments`, method: 'DELETE' }),
    }),
    getAssignmentQuestions: builder
      .query<GetAssignmentQuestionsResponse, number>({
      query: (id) => ({ url: `/assignment/${id}/questions`, method: 'GET' }),
    }),
    deleteAssignment: builder.mutation<ResponseType, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'DELETE' }),
    }),
    deleteQuestion: builder.mutation<ResponseType, number>({
      query: (question_id) => ({ url: `/questions/${question_id}`, method: 'DELETE' }),
    }),
    submitAssignment: builder.mutation<void, SubmitAssignmentRequest>({
      query: (data) => ({ url: '/assignment/submit', method: 'POST', data }),
    }),
    getAssignmentSubmissions: builder
      .query<GetAllAssignmentsResponse, GetAssignmentSubmissionsRequest>({
      query: (data) => ({ url: '/assignment/submissions', method: 'POST', data }),
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentByIdQuery,
  useDeleteAssignmentMutation,
  useGetCourseAssignmentsQuery,
  useGetAssignmentQuestionsQuery,
  useSubmitAssignmentMutation,
  useGetAssignmentSubmissionsQuery,
  useDeleteQuestionMutation,
  useUpdateAssignmentMutation,
} = assignmentService;

export default assignmentService;
