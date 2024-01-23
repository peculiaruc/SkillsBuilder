import { Grid } from '@mui/material';
import { useGetUserGroupsQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { GroupType, JoinGroupType } from '../../../interfaces/GroupTypes';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import GroupItem from './GroupItem';

export default function GroupListJoined() {
  const auth = useAuth();
  const { data, isLoading } = useGetUserGroupsQuery(auth.user.id);
  if (isLoading) return <Loader />;

  const groups = data?.data.groups.filter(
    (g: JoinGroupType) => g.owner_id !== auth.user.id,
  );

  if (!groups) return <EmptyView title="User group not found" code={404} />;

  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      {groups.map((g: JoinGroupType) => (
        <Grid item xs={1} key={g.id}>
          <GroupItem group={{ ...g, id: g.group_id } as unknown as GroupType} />
        </Grid>
      ))}
    </Grid>
  );
}
