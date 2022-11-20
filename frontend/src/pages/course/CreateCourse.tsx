import { FormikValues } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useCreateCourseMutation } from '../../apiServices/courseService';
import FormBuilder from '../../components/forms/FormBuilder';
import { CourseItem } from '../../interfaces/Course';
import Course from '../../models/Course';
import { addCourse } from '../../store/courseReducer';

function CreateCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = new Course();
  // const [createCourse] = useCreateCourseMutation();

  const onSubmit = async (values: FormikValues) => {
    const data = values as CourseItem;
    // console.log(data, values);
    dispatch(addCourse(data));
    navigate('/courses');
    // await createCourse(data).unwrap();
    // console.log(response);
  };
  const [open, setOpen] = useState(true);

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
