import { Stack } from '@mui/material';
import { CourseItem } from '../../interfaces/Course';
import { useCourses } from '../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const courses : CourseItem[] = useCourses();

  return (

    <Stack spacing={2}>
      {courses.map((course) => <ListItemCourse course={course} key={course.id} />)}
    </Stack>
  );
}

export default CourseList;
