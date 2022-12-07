import { Grid } from '@mui/material';
import { useGetUserGroupsQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { GroupType } from '../../../interfaces/GroupTypes';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import GroupItem from './GroupItem';

export default function GroupListJoined() {
  const auth = useAuth();
  const { data, isLoading } = useGetUserGroupsQuery(auth.user.id);
  if (isLoading) return <Loader />;

  const groups = data?.data.groups.filter(
    (g: GroupType) => Number(g.owner_id) !== Number(auth.user.id),
  );

  if (!groups) return <EmptyView title="User group not found" code={404} />;

  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      {groups.map((g: GroupType, key) => (
        <Grid item xs={1} key={key}>
          <GroupItem group={g} />
        </Grid>
      ))}
    </Grid>
  );
}
