import { ResponseType } from './ResponseType';
import { CourseId } from './CourseType';

export type CourseLessonType = {
  id: number,
  lesson_title: string,
  lesson_summary: string,
  lesson_no: number,
  lesson_content: string,
  lesson_content_type: string,
  course_id: number,
  created_at: Date;
  updated_at: Date;
};

export type CreateCourseLessonRequest = Omit<CourseLessonType, 'id' | 'created_at' | 'updated_at'>;
export type CreateCourseLessonResponse = ResponseType & {
  data: {
    lessons: CourseLessonType[],
  }
};
export type GetLessonResponse = CreateCourseLessonResponse;
export type GetCourseLessonRequest = CourseId;
export type DeleteLessonResponse = ResponseType;
export type UpdateLessonRequest = CourseLessonType;
export type UpdateLessonResponse = CreateCourseLessonResponse;
