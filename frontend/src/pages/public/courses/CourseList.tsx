import { Stack } from '@mui/material';
import { CourseItem } from '../../../interfaces/Course';
import { useCourses, useEnrolledCourses } from '../../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const enrolled = useEnrolledCourses() ?? [];
  const courseIds = enrolled.map((e) => e.id);
  const allCourses = useCourses() ?? [];

  const courses = allCourses.filter((c:CourseItem) => courseIds.includes(c.id));

  return (

    <Stack spacing={2}>
      {courses && courses.map((course) => <ListItemCourse course={course} key={course.id} />)}
    </Stack>
  );
}

export default CourseList;
