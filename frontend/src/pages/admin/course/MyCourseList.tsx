import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateCourseMutation } from '../../../apiServices/courseService';
import { useGetAuthorCoursesQuery } from '../../../apiServices/userService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CourseType } from '../../../interfaces/CourseType';
import Course from '../../../models/Course';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const dispatch = useDispatch();

  const auth = useAuth();

  const model = new Course();

  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createCourse] = useCreateCourseMutation();
  const { data: resp, isLoading } = useGetAuthorCoursesQuery(auth.user.id);

  if (isLoading) { return <CircularProgress />; }

  const onSubmit = async (values: FormikValues) => {
    const data = { ...values, author_id: auth.user.id } as unknown;
    await createCourse(data as CourseType).unwrap();
    onCancel();
    toast('Course created successfully');
  };
  const courses = resp?.data.courses ?? [];
  /*
  const onSubmit = async (values: FormikValues) => {
    const course = values as CourseType;
    course.id = Math.round(Math.random() * 100);
    batch(
      () => {
        dispatch(addCourse(course));
        onCancel();
      },
    );
    Toastify({
      text: 'Course created successfully',
    });
  };
*/
  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 0 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Course</Button>
          <FormBuilder
            dialog
            title="Create a course"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
        </>
      )}
      {courses.map((course: CourseType) => <ListItemCourse course={course} key={course.title} />)}
    </Stack>
  );
}

export default CourseList;
