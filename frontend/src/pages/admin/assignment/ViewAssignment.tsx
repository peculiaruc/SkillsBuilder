import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAssignmentByIdQuery } from '../../../apiServices/assignmentService';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import EmptyView from '../../errors/EmptyView';
import AssigmentQusetionsList from './AssigmentQusetionsList';
import AssignmentOverView from './AssignmentOverview';
import SubmissionGrid from './SubmissionGrid';

export default function ViewAssignment() {
  const { id } = useParams();
  const { data, isLoading } = useGetAssignmentByIdQuery(Number(id));
  if (isLoading) return <Loader />;
  const assignment = data?.data.assignments as AssignmentType;
  if (!assignment) return <EmptyView title="Assigment not found" code={404} />;
  return (
    <Stack spacing={4}>
      <AssignmentOverView />
      <TabView
        title="Info"
        tabs={[
          {
            name: 'Questions',
            component: <AssigmentQusetionsList />,
          },
          {
            name: 'Submissions',
            component: <SubmissionGrid />,
          },
        ]}
      />
    </Stack>
  );
}
