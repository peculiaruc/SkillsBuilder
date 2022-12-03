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

export type GetCourseMaterialRequest = {
  course_id: number,
};

export type GetCourseMaterialResponse = {
  error: string,
  status:string,
  data:{
    materials: CourseMaterialType[],
  }
};
