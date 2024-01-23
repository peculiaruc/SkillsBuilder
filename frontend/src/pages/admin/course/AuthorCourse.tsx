import { Stack } from '@mui/material';
import { useCreateCourseMutation } from '../../../apiServices/courseService';
import { useGetAuthorCoursesQuery } from '../../../apiServices/userService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { CourseType } from '../../../interfaces/CourseType';
import Course from '../../../models/Course';
import { useAuth } from '../../../store/authReducer';
import ListItemCourse from './ListItemCourse';

function AuthorCourse() {
  const { user } = useAuth();
  const [createCourse] = useCreateCourseMutation();
  const { data, isLoading } = useGetAuthorCoursesQuery(user.id);
  if (isLoading) { return <Loader />; }
  const courses = data?.data.courses ?? [];

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      <MixedForm
        dialog
        title="Create a course"
        mutation={createCourse}
        model={new Course({ author_id: user.id })}
      />
      {courses.map((course: CourseType) => <ListItemCourse course={course} key={course.title} />)}
    </Stack>
  );
}

export default AuthorCourse;
