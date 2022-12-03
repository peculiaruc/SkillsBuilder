export type CourseType = {
  id: number,
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

export type EnrollInCourseRequest = {
  userId:number,
  course_id:number,
};
export type EnrollInCourseResponse = {
  error?: string,
  status:string,
};

export type ResetPasswordRequest = {
  email:string,
};
