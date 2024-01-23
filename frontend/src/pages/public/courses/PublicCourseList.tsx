import { Stack } from '@mui/material';
import { CourseType, EnrolledCourseType } from '../../../interfaces/CourseType';
import { useCourses } from '../../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function PublicCoursesList() {
  const courses : CourseType[] = useCourses();
  return (

    <Stack spacing={2} width="100%">
      {courses && courses.map((course) => (
        <ListItemCourse
          course={course as EnrolledCourseType}
          key={course.id}
        />
      ))}
    </Stack>
  );
}

export default PublicCoursesList;
