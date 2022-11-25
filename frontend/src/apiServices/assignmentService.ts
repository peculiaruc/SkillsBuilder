import api from '.';
import {
  CreateAssignmentRequest,
  GetAssignmentResponse,
  GetAssignmentsResponse,
  GetCourseAssignmentRequest,
  UpdateAssignmentRequest,
  DeleteAssignmentRequest,
  SubmitAssignmentRequest,
  GetAssignmentQuestionsRequest,
  GetAssignmentQuestionsResponse,
  GetAssignmentSubmissionsRequest,
} from '../interfaces/AssingmentType';

const assignmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<GetAssignmentResponse, CreateAssignmentRequest>({
      query: (assignment) => ({ url: '/assignment/create', method: 'POST', data: assignment }),
    }),
    updateOneAssignment: builder.mutation<GetAssignmentResponse, UpdateAssignmentRequest>({
      query: (assignment) => ({ url: `/assignment/${assignment.id}`, method: 'PUT', data: assignment }),
    }),
    getAssignmentById: builder.query<GetAssignmentResponse, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'GET' }),
    }),
    getCourseAssignments: builder.query<GetAssignmentsResponse, GetCourseAssignmentRequest>({
      query: (data) => ({ url: '/assignment/assignments', method: 'POST', data }),
    }),
    getAssignmentQuestions: builder
      .query<GetAssignmentQuestionsResponse, GetAssignmentQuestionsRequest>({
      query: (data) => ({ url: '/assignment/questions', method: 'POST', data }),
    }),
    deleteOneAssignment: builder.mutation<void, DeleteAssignmentRequest>({
      query: (data) => ({ url: '/assignment/delete', method: 'POST', data }),
    }),
    deleteOneQuestion: builder.mutation<void, number>({
      query: (question_id) => ({ url: `/questions/${question_id}`, method: 'DELETE' }),
    }),
    submitAssignment: builder.mutation<void, SubmitAssignmentRequest>({
      query: (data) => ({ url: '/assignment/submit', method: 'POST', data }),
    }),
    getAssignmentSubmissions: builder
      .query<GetAssignmentsResponse, GetAssignmentSubmissionsRequest>({
      query: (data) => ({ url: '/assignment/submissions', method: 'POST', data }),
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentByIdQuery,
  useDeleteOneAssignmentMutation,
  useUpdateOneAssignmentMutation,
  useGetCourseAssignmentsQuery,
  useGetAssignmentQuestionsQuery,
  useSubmitAssignmentMutation,
  useGetAssignmentSubmissionsQuery,
  useDeleteOneQuestionMutation,
} = assignmentService;

export default assignmentService;
