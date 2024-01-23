import { Grid } from '@mui/material';
import { useGetAssignmentSubmissionsQuery } from '../../../apiServices/assignmentService';
import Loader from '../../../components/Loader';
import { useAssignment } from '../../../store/assignmentReducer';
import SubmissionItem from './SubmissionItem';

export default function SubmissionGrid() {
  const { id } = useAssignment();
  const { data, isLoading } = useGetAssignmentSubmissionsQuery(Number(id));
  if (isLoading) return <Loader />;
  const submissions = data?.data.submissions;

  return (
    <Grid container columns={[1, 1, 2, 3]} spacing={1}>
      {submissions && submissions.map((submission) => (
        <Grid item xs={1} key={submission.id} p={1}>
          <SubmissionItem submission={submission} />
        </Grid>
      ))}
    </Grid>
  );
}
