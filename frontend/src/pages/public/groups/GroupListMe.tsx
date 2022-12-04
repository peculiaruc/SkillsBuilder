import { Grid } from '@mui/material';
import { useAuth } from '../../../store/authReducer';
import { useGroups } from '../../../store/groupReducer';
import CreateGroupItem from './CreateGroupItem';
import GroupItem from './GroupItem';

export default function GroupListMe() {
  const auth = useAuth();
  const allGroups = useGroups();
  const groups = allGroups.filter((group) => group.owner_id === String(auth.user.id));

  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1}>
        <CreateGroupItem />
      </Grid>
      {groups.map((g, key) => (
        <Grid item xs={1} key={key}>
          <GroupItem group={g} />
        </Grid>
      ))}
    </Grid>
  );
}
