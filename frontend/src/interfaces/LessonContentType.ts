import { ResponseType } from './ResponseType';

export type LessonContentType = {
  id: number,
  content_title: string,
  content_position: number,
  content: string | Record<string, unknown>,
  content_type:string,
  content_id: number,
  created_at: Date,
  updated_at: Date
};

export type LessonId = number;

export type CreateLessonRequest = Omit<LessonContentType, 'id' | 'created_at' | 'updated_at'>;

export type CreateLessonResponse = ResponseType & {
  data: {
    content: LessonContentType
  }
};

export type GetLessonRequest = LessonId;
export type GetLessonsResponse = ResponseType & {
  data: {
    contents: LessonContentType[]
  }
};
export type GetLessonResponse = ResponseType & {
  data: {
    content: LessonContentType
  }
};
export type DeleteLessonRequest = LessonId;
export type DeleteLessonResponse = ResponseType;
export type UpdateLessonRequest = LessonContentType;
export type UpdateLessonResponse = CreateLessonResponse;
