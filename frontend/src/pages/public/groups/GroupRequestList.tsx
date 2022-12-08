import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetGroupAccessRequestsQuery } from '../../../apiServices/groupService';
import Loader from '../../../components/Loader';
import { GroupAccessRequestType } from '../../../interfaces/GroupTypes';
import EmptyView from '../../errors/EmptyView';
import JoinGroupRequest from './JoinGroupRequest';

export default function GroupRequestList() {
  const { id } = useParams();

  const { data, isLoading } = useGetGroupAccessRequestsQuery(Number(id));

  if (isLoading) return <Loader />;

  const requests = data?.data.requests as GroupAccessRequestType[];

  if (!requests) return <EmptyView title="No group request" code={404} />;

  return (
    <Stack spacing={2}>
      {requests.map((request) => (
        <JoinGroupRequest key={request.id} request={request} />
      ))}
    </Stack>
  );
}
