export type CourseItem = {
  name: string,
  summary: string,
  description: string,
  thumbnail: string,
  updated_at: string,
  id: string,
  course_id?: string,
  status:string;
  created_at:string;
};

export type CourseListType = {
  courses: CourseItem[]
};
