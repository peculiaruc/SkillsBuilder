import { Stack } from '@mui/material';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';
import { CourseType } from '../../../interfaces/CourseType';
import ListItemCourse from './ListItemCourse';

function PublicCourse() {
  const { data, isLoading } = useGetAllCoursesQuery();

  if (isLoading) { return <Loader />; }

  const courses = data?.data.courses ?? [];

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {courses.map((course: CourseType) => <ListItemCourse course={course} key={course.title} />)}
    </Stack>
  );
}

export default PublicCourse;
