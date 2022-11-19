import { FormikValues } from 'formik';
import { useState } from 'react';
import { useCreateCourseMutation } from '../../apiServices/courseService';
import FormBuilder from '../../components/forms/FormBuilder';
import { CourseItem } from '../../interfaces/Course';
import Course from '../../models/Course';

function CreateCourse() {
  const course = new Course();
  const [createCourse] = useCreateCourseMutation();

  const onSubmit = async (values: FormikValues) => {
    const data = values as CourseItem;
    await createCourse(data).unwrap();
    // console.log(response);
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <FormBuilder
      open={open}
      dialog
      title="Create course"
      model={course}
      onSubmit={onSubmit}
      handleClose={handleClose}
    />
  );
}

export default CreateCourse;
