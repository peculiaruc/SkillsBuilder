import { Stack } from '@mui/material';
import { useCourses } from '../../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function PublicCoursesList() {
  const courses = useCourses();
  return (

    <Stack spacing={2} width="100%">
      {courses && courses.map((course) => <ListItemCourse course={course} key={course.id} />)}
    </Stack>
  );
}

export default PublicCoursesList;
