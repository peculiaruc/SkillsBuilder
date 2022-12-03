import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCreateAssignmentMutation, useGetCourseAssignmentsQuery } from '../../../apiServices/assignmentService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { AssingmentType } from '../../../interfaces/AssignmentType';
import Assignment from '../../../models/Assignments';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';
import ListAssignment from '../../public/assignments/ListAssignment';

function AssignmentList() {
  const params = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  const courseId = Number(params.id);
  const model = new Assignment();
  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createAssignment] = useCreateAssignmentMutation();
  const { isLoading } = useGetCourseAssignmentsQuery({ course_id: courseId });
  if (isLoading) return <CircularProgress />;

  const onSubmit = async (values: FormikValues) => {
    const assignment = { ...values, course_id: courseId } as AssingmentType;
    await createAssignment(assignment).unwrap();
  //  console.log(values, response);
  };
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
      {auth.user.role > 1 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>Create Assigment</Button>
          <FormBuilder
            dialog
            title="Create Assignment"
            onSubmit={onSubmit}
            onCancel={onCancel}
            model={model}
          />
          <ListAssignment />
        </>
      )}
    </Stack>
  );
}

export default AssignmentList;
