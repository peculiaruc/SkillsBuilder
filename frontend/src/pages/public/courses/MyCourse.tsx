import { Stack } from '@mui/material';
import { useGetUserCoursesQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { EnrolledCourseType } from '../../../interfaces/CourseType';
import { useAuth } from '../../../store/authReducer';
import ListItemCourse from './ListItemCourse';

function MyCourse() {
  const { user } = useAuth();
  const { data, isLoading } = useGetUserCoursesQuery(user.id);
  if (isLoading) { return <Loader />; }
  const courses = data?.data.courses ?? [];

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {courses.map(
        (course: EnrolledCourseType) => (
          <ListItemCourse
            course={course}
            key={course.course_id}
          />
        ),
      )}
    </Stack>
  );
}

export default MyCourse;
