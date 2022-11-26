import { Stack } from '@mui/material';
import React from 'react';
import { useAssignments } from '../../../store/assignmentReducer';
import AssignmentItem from './AssignmentItem';

export default function ListAssignmentPassed() {
  const assignments = useAssignments();

  return (
    <Stack spacing={2} sx={{ width: '100%', height: '100%' }}>
      {assignments && assignments.map(
        (assignment) => <AssignmentItem key={assignment.id} {...assignment} status="passed" />,
      )}
      <AssignmentItem status="passed" />
      <AssignmentItem status="passed" />
      <AssignmentItem status="passed" />
      <AssignmentItem status="passed" />
    </Stack>
  );
}
