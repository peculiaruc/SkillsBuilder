import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateCourseMutation, useGetAllCoursesQuery } from '../../../apiServices/courseService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CourseItem } from '../../../interfaces/Course';
import Course from '../../../models/Course';
import { useAuth } from '../../../store/authReducer';
import { useCourses } from '../../../store/courseReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const dispatch = useDispatch();

  const auth = useAuth();

  const model = new Course();
  const courses: CourseItem[] = useCourses();
  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createCourse] = useCreateCourseMutation();
  const { isLoading } = useGetAllCoursesQuery();

  if (isLoading) { return <CircularProgress />; }

  const onSubmit = async (values: FormikValues) => {
    const data = { ...values, author_id: auth.user.id } as unknown;
    await createCourse(data as CourseItem).unwrap();
    onCancel();
    toast('Course created successfully');
  };
  /*
  const onSubmit = async (values: FormikValues) => {
    const course = values as CourseItem;
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
      {auth.user.role > 1 && (
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
      {courses.map((course: CourseItem) => <ListItemCourse course={course} key={course.name} />)}
    </Stack>
  );
}

export default CourseList;
