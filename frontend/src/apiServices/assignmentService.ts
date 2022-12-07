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
    getCourseAssignments: builder.query<GetAllAssignmentsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/assignments`, method: 'DELETE' }),
    }),
    getAssignmentQuestions: builder
      .query<GetAssignmentQuestionsResponse, number>({
      query: (id) => ({ url: `/assignment/${id}/questions`, method: 'GET' }),
    }),
    deleteOneAssignment: builder.mutation<void, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'DELETE' }),
    }),
    deleteOneQuestion: builder.mutation<void, number>({
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
  useDeleteOneAssignmentMutation,
  useUpdateOneAssignmentMutation,
  useGetCourseAssignmentsQuery,
  useGetAssignmentQuestionsQuery,
  useSubmitAssignmentMutation,
  useGetAssignmentSubmissionsQuery,
  useDeleteOneQuestionMutation,
} = assignmentService;

export default assignmentService;
