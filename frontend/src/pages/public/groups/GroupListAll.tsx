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
  const auth = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = auth.user.role > 1 ? useGetAllGroupsQuery() : useGetUserGroupsQuery(auth.user.id);
  if (isLoading) return <Loader />;

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
