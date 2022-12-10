import { Stack } from '@mui/material';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import AssignmentItem from './AssignmentItem';

type Props = {
  assignments: AssignmentType[]
};

function AssignmentList({ assignments }: Props) {
  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {assignments && assignments.map(
        (assignment) => <AssignmentItem key={assignment.id} assignment={assignment} />,
      )}
    </Stack>
  );
}

export default AssignmentList;
