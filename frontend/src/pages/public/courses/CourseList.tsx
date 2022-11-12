import { Stack } from '@mui/material';
import { CourseItem } from '../../../interfaces/Course';
import { useCourses, useEnrolledCourses } from '../../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const enrolled : CourseItem[] = useEnrolledCourses();
  const courseIds = enrolled.map((e) => e.id);
  const allCourses : CourseItem[] = useCourses();

  const courses = allCourses.filter((c) => courseIds.includes(c.id));

  return (

    <Stack spacing={2}>
      {courses.map((course) => <ListItemCourse course={course} key={course.id} />)}
    </Stack>
  );
}

export default CourseList;
