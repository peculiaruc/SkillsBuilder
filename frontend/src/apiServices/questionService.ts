import api from '.';
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
  DeleteQuestionResponse,
  GetQuestionResponse,
  QuestionId,
  QuestionType, UpdateQuestionResponse,
} from '../interfaces/QuestionType';

const questionService = api.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation<CreateQuestionResponse, CreateQuestionRequest>({
      query: (data) => ({ url: '/question/create', method: 'POST', data }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
    updateQuestion: builder.mutation<UpdateQuestionResponse, QuestionType>({
      query: ({ id, ...data }) => ({ url: `/question/${id}`, method: 'PUT', data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Question', id: 'LIST' }, { type: 'Question', id }],
    }),
    getQuestionById: builder.query<GetQuestionResponse, QuestionId>({
      query: (id) => ({ url: `/question/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Question', id }],
    }),
    deleteQuestion: builder.mutation<DeleteQuestionResponse, QuestionId>({
      query: (id) => ({ url: `/question/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetQuestionByIdQuery,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = questionService;

export default questionService;
