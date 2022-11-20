import { Stack } from '@mui/material';
import React from 'react';
import AssignmentItem from './AssignmentItem';

export default function ListAssignment() {
  return (
    <Stack spacing={2} sx={{ width: '100%', height: '100%' }}>
      <AssignmentItem />
      <AssignmentItem />
      <AssignmentItem />
      <AssignmentItem />
      <AssignmentItem />
    </Stack>
  );
}
