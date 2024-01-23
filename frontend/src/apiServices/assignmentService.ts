/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '.';
import {
  ChoiceType,
  CreateAssignmentRequest,
  GetAllAssignmentsResponse,
  GetAssignmentQuestionsResponse,
  GetAssignmentResponse, GetAssignmentSubmissionsResponse, SubmitAssignmentRequest,
  UpdateAssignmentRequest,
} from '../interfaces/AssignmentType';
import { CourseId } from '../interfaces/CourseType';
import { QuestionType } from '../interfaces/QuestionType';
import { ResponseType } from '../interfaces/ResponseType';

const assignmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<GetAssignmentResponse, CreateAssignmentRequest>({
      query: (assignment) => ({ url: '/assignment/create', method: 'POST', data: assignment }),
      invalidatesTags: ['USER_ASSIGNMENTS', 'COURSE_ASSIGNMENTS'],
    }),
    updateAssignment: builder.mutation<GetAssignmentResponse, UpdateAssignmentRequest>({
      query: ({ id, ...data }) => ({ url: `/assignment/${id}`, method: 'PUT', data }),
      invalidatesTags: ['USER_ASSIGNMENTS', 'COURSE_ASSIGNMENTS'],
    }),
    getAssignmentById: builder.query<GetAssignmentResponse, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'GET' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getCourseAssignments: builder.query<GetAllAssignmentsResponse, CourseId>({
      query: (id) => ({ url: `/course/${id}/assignments`, method: 'DELETE' }),
      providesTags: ['USER_ASSIGNMENTS'],
    }),
    getAssignmentQuestions: builder
      .query<GetAssignmentQuestionsResponse, number>({
      query: (id) => ({ url: `/assignment/${id}/questions`, method: 'GET' }),
      transformResponse(res: GetAssignmentQuestionsResponse, _meta, _arg) {
        const assignments = res.data.assignments.map(
          (assignment: QuestionType) => ({
            ...assignment,
            choices: Array.isArray(assignment.choices) ? assignment.choices : JSON.parse(
              assignment.choices as unknown as string,
            ) as ChoiceType[],
          }),
        );
        return { data: { ...res.data, assignments } } as unknown as GetAssignmentQuestionsResponse;
      },
      providesTags: [{ type: 'Question', id: 'LIST' }],
    }),
    deleteAssignment: builder.mutation<ResponseType, number>({
      query: (id) => ({ url: `/assignment/${id}`, method: 'DELETE' }),
      invalidatesTags: ['USER_ASSIGNMENTS', 'COURSE_ASSIGNMENTS'],
    }),
    submitAssignment: builder.mutation<ResponseType, SubmitAssignmentRequest>({
      query: (data) => ({ url: '/submission/create', method: 'POST', data }),
    }),
    getAssignmentSubmissions: builder
      .query<GetAssignmentSubmissionsResponse, number>({
      query: (id) => ({ url: `/assignment/${id}/submissions`, method: 'GET' }),
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
  useUpdateAssignmentMutation,
} = assignmentService;

export default assignmentService;
