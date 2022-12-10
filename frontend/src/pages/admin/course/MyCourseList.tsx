import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateCourseMutation } from '../../../apiServices/courseService';
import { useGetAuthorCoursesQuery } from '../../../apiServices/userService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CourseType } from '../../../interfaces/CourseType';
import Course from '../../../models/Course';
import { useAuth } from '../../../store/authReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const auth = useAuth();

  const model = new Course();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const onCancel = () => setOpen(false);
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

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 0 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Course</Button>
          <FormBuilder
            open={open}
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
