import { FormikValues } from 'formik';
import { useCreateOneCourseMutation } from '../../apiServices/courseService';
import FormBuilder from '../../components/forms/FormBuilder';
import Course from '../../models/Course';

function CreateCourse() {
  const course = new Course();
  const [createCourse] = useCreateOneCourseMutation();

  const onSubmit = async (values: FormikValues) => {
    // const course = values as CourseItem;
    const response = await createCourse(values);
    console.log(response);
  };

  return (

    <FormBuilder
      model={course}
      onSubmit={onSubmit}
      onClose={() => { }}
      onOpen={() => { }}
    />

  );
}

export default CreateCourse;
