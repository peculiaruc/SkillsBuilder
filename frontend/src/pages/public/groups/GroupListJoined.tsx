import { Grid } from '@mui/material';
import { useGroups, useJoinedGroups } from '../../../store/groupReducer';
import GroupItem from './GroupItem';

export default function GroupListJoined() {
  const allGroups = useGroups();
  const joinedGroups = useJoinedGroups();
  const groups = allGroups.filter((group) => joinedGroups.includes(group.id));
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      {groups.map((g, key) => (
        <Grid item xs={1} key={key}>
          <GroupItem group={g} />
        </Grid>
      ))}
    </Grid>
  );
}
