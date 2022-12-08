/* eslint-disable max-len */
import { Grid } from '@mui/material';
import { useGetAllGroupsQuery } from '../../../apiServices/groupService';
import { useGetUserGroupsQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { GroupType } from '../../../interfaces/GroupTypes';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import CreateGroupItem from './CreateGroupItem';
import GroupItem from './GroupItem';

export default function GroupListAll() {
  const { user } = useAuth();
  const { data, isLoading } = useGetAllGroupsQuery();
  const { isLoading: u } = useGetUserGroupsQuery(Number(user.id));
  if (isLoading || u) return <Loader />;

  const groups = data?.data.groups;

  if (!groups) return <EmptyView title="User group not found" code={404} />;

  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1}>
        <CreateGroupItem />
      </Grid>
      {groups.map((g: GroupType, key) => (
        <Grid item xs={1} key={key}>
          <GroupItem group={g} />
        </Grid>
      ))}
    </Grid>
  );
}
