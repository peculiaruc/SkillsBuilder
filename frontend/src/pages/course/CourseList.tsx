import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CourseItem } from '../../interfaces/Course';
import { useCourses } from '../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const courses: CourseItem[] = useCourses();
  const navigate = useNavigate();

  return (

    <Stack spacing={2}>
      <Button onClick={() => navigate('/courses/create')}>Create Course</Button>
      {courses.map((course) => <ListItemCourse course={course} key={course.id} />)}
    </Stack>
  );
}

export default CourseList;
