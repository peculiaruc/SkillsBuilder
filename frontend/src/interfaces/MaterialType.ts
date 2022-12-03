import { ResponseType } from './ResponseType';

export type CourseMaterialType = {
  id: number,
  name: string,
  path: string,
  course_id: number,
};

export type CreateCourseMaterialRequest = CourseMaterialType;

export type CreateCourseMatarialResponse = ResponseType & {
  data:{
    material: CourseMaterialType,
  }
};
