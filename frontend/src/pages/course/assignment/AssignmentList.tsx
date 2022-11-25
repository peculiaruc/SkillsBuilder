import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetCourseAssignmentsQuery } from '../../../apiServices/assignmentService';
import FormBuilder from '../../../components/forms/FormBuilder';
import Question from '../../../models/Question';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';

function AssignmentList() {
  const params = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  const courseId = Number(params.id);
  const model = new Question();
  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const { data, isLoading } = useGetCourseAssignmentsQuery({ course_id: courseId });
  if (isLoading) return <CircularProgress />;

  const assignments = data?.data.assignments;

  console.log(assignments);

  const onSubmit = async (values: FormikValues) => {
    console.log(values);
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
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Assigment</Button>
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
          <FormBuilder
            dialog={false}
            title="Add a question"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
        </>
      )}
    </Stack>
  );
}

export default AssignmentList;
