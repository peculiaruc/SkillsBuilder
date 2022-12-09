import { Stack } from '@mui/material';
import { useCreateAssignmentMutation } from '../../../apiServices/assignmentService';
import {
  useGetAuthorAssignmentsQuery,
  useGetAuthorCoursesQuery,
} from '../../../apiServices/userService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import Assignment from '../../../models/Assignments';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import AssignmentList from './AssignmentList';

function AuthorAssignment() {
  const { user } = useAuth();
  const [createAssigment] = useCreateAssignmentMutation();
  const {
    data: resAssignments,
    isLoading: isLoadingAssignments,
  } = useGetAuthorAssignmentsQuery(user.id);
  const {
    data: resCourses,
    isLoading: isLoadingCourses,
  } = useGetAuthorCoursesQuery(user.id);
  if (isLoadingAssignments || isLoadingCourses) return <Loader />;
  const assignments = resAssignments?.data.assignments as AssignmentType[];
  const course = resCourses?.data.courses;
  const model = new Assignment({ author_id: user.id });
  model.data = { ...model.data, course };

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {course ? (
        <>
          <MixedForm
            dialog
            title="Create Assignment"
            mutation={createAssigment}
            model={model}
          />
          <AssignmentList assignments={assignments} />
        </>
      ) : (
        <EmptyView
          title="No assigment created yet. Please create a course"
          code={404}
        />
      )}
    </Stack>
  );
}

export default AuthorAssignment;
