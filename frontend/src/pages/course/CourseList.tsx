import { Button, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Toastify from 'toastify-js';
// import { useCreateCourseMutation } from '../../apiServices/courseService';
import FormBuilder from '../../components/forms/FormBuilder';
import { CourseItem } from '../../interfaces/Course';
import Course from '../../models/Course';
import { addCourse, useCourses } from '../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();

  const courses: CourseItem[] = useCourses();

  const model = new Course();

  // const [createCourse] = useCreateCourseMutation();

  /* const onSubmit = async (values: FormikValues) => {
    const data = values as CourseItem;
    await createCourse(data).unwrap();
    Toastify({
      text: 'Course created successfully',
    });
  }; */

  const onSubmit = async (values: FormikValues) => {
    dispatch(addCourse(values as CourseItem));
    Toastify({
      text: 'Course created successfully',
    });
    handleClose();
  };

  return (
    <Stack spacing={2} display="flex">
      <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Course</Button>
      <FormBuilder
        open={open}
        dialog
        title="Create course"
        model={model}
        onSubmit={onSubmit}
        handleClose={handleClose}
      />
      {courses.map((course: CourseItem) => <ListItemCourse course={course} key={course.name} />)}
    </Stack>
  );
}

export default CourseList;
