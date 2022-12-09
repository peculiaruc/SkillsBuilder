import { ResponseType } from './ResponseType';

export type CourseLessonType = {
  id: number,
  lesson_title: string,
  lesson_summary: string,
  lesson_no: number,
  lesson_content: string,
  lesson_content_type: string,
  course_id: number,

};

export type CreateCourseLessonRequest = CourseLessonType;

export type CreateCourseLessonResponse = ResponseType & {
  data: {
    lesson: CourseLessonType,
  }
};
