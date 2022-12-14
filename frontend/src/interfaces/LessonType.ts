import { MediaType } from './MediaType';
import { ResponseType } from './ResponseType';

export type LessonType = {
  id: number,
  lesson_title:string,
  lesson_summary:string,
  lesson_no: number,
  lesson_content:string,
  lesson_content_type:string,
  course_id: number,
  contents?: MediaType[],
  created_at: Date,
  updated_at: Date
};

export type LessonId = number;

export type CreateLessonRequest = Omit<LessonType, 'id' | 'created_at' | 'updated_at'>;

export type CreateLessonResponse = ResponseType & {
  data: {
    lesson: LessonType
  }
};

export type GetLessonRequest = LessonId;
export type GetLessonsResponse = ResponseType & {
  data: {
    lessons: LessonType[]
  }
};
export type GetLessonResponse = ResponseType & {
  data: {
    lesson: LessonType
  }
};
export type DeleteLessonRequest = LessonId;
export type DeleteLessonResponse = ResponseType;
export type UpdateLessonRequest = LessonType;
export type UpdateLessonResponse = CreateLessonResponse;
