import { CourseMaterialType } from "./MaterialType";
import { ResponseType } from "./ResponseType";
import { GetAllUsersResponse, UserId, UserType } from "./UserType";

export type CourseId = number;

export type CourseType = {
  id: CourseId,
  title: string,
  description: string,
  content: string,
  author_id: number,
  updated_at: string,
  created_at:string;
};

export type CourseListType = {
  courses: CourseType[]
};

export type CreateCourseRequest = Omit<CourseType, 'id' | 'created_at' | 'updated_at'>;

export type CreateCourseResponse = ResponseType & {
  data: {
    course: CourseType
  }
};
export type GetCourseRequest = CourseId;
export type GetCourseResponse = CreateCourseResponse;
export type DeleteCourseRequest = CourseId;
export type DeleteCourseResponse = ResponseType;
export type UpdateCourseRequest = CourseType;
export type UpdateCourseResponse = CreateCourseResponse;

export type GetAllCoursesRequest = void;

export type GetAllCoursesResponse = ResponseType & {
  data:{
    courses: CourseType[]
  }
};

export type EnrollInCourseRequest = {
  courseId: CourseId,
  userId: UserId
};

export type EnrollInCourseResponse = ResponseType;

export type UnEnrollInCourseRequest = EnrollInCourseRequest;

export type UnEnrollInCourseResponse = ResponseType;

export type GetCourseLearnersRequest = CourseId;

export type GetCourseLearnersResponse = GetAllUsersResponse;

export type GetCourseMaterialsResponse = ResponseType & {
  data:{
    materials: CourseMaterialType[],
  }
};

export type GetCourseAuthorResponse = ResponseType & {
  data:{
    author: UserType,
  }
};

export type EnrolledCourseType = {
  id: number,
  course_id: number,
  enroll_date: string,
  unenroll_date: string,
  created_at: string,
  updated_at: string,
} & CourseType;

export type EnrolledCourseResponseType = {
  status: string,
  error?: string,
  data: {
    courses: EnrolledCourseType[],
  }
};

export type ResetPasswordRequest = {
  email:string,
};
