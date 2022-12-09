import { Button, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssignmentByIdQuery } from '../../../apiServices/assignmentService';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import EmptyView from '../../errors/EmptyView';
import AssigmentQusetionsList from './AssigmentQusetionsList';
import AssignmentOverView from './AssignmentOverview';

export default function ViewAssignment() {
  const { id } = useParams();
  const { data, isLoading } = useGetAssignmentByIdQuery(Number(id));
  if (isLoading) return <Loader />;
  const assignment = data?.data.assignment as AssignmentType;
  if (!assignment) return <EmptyView title="Assigment not found" code={404} />;
  return (
    <Stack spacing={2}>
      <AssignmentOverView assignment={assignment} />
      <TabView
        title="Info"
        tabs={[
          {
            name: 'Questions',
            component: <AssigmentQusetionsList assignment={assignment} />,
          },
          {
            name: 'Leaners',
            component: <Button>Learners of this assigment</Button>,
          },
        ]}
      />
    </Stack>
  );
}
