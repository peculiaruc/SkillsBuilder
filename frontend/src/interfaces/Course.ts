export type CourseItem = {
  name: string,
  summary: string,
  description: string,
  thumbnail: string,
  updated_at: string,
  id: number,
  status:string;
  created_at:string;
};

export type CourseListType = {
  courses: CourseItem[]
};

export type EnrolledCourseType = {
  id: number,
  course_id: number,
  user_id: number,
  enroll_date: string,
  unenroll_date: string,
  created_at: string,
  updated_at: string,
  course_name?: string
};

export type EnrolledCourseResponseType = {
  status: string,
  error?: string,
  data: {
    courses: EnrolledCourseType[],
  }
};

export type EnrollInCourseResponse = {
  error?: string,
  status:string,
};

export type ResetPasswordRequest = {
  email:string,
};
