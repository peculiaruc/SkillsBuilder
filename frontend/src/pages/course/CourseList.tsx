import { Button, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { batch, useDispatch } from 'react-redux';
import Toastify from 'toastify-js';
// import { useCreateCourseMutation } from '../../apiServices/courseService';
import FormBuilder from '../../components/forms/FormBuilder';
import { CourseItem } from '../../interfaces/Course';
import Course from '../../models/Course';
import { useAuth } from '../../store/authReducer';
import { addCourse, useCourses } from '../../store/courseReducer';
import { closeDialog, openDialog } from '../../store/dialogFormReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const auth = useAuth();

  const model = new Course();
  const courses: CourseItem[] = useCourses();
  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  // const [createCourse] = useCreateCourseMutation();

  /* const onSubmit = async (values: FormikValues) => {
    const data = values as CourseItem;
    await createCourse(data).unwrap();
    Toastify({
      text: 'Course created successfully',
    });
  }; */

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

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 1 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Course</Button>
          <FormBuilder
            dialog
            title="Create course"
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
