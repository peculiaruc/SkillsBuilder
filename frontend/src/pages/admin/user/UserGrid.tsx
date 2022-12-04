import { Grid } from '@mui/material';
import UserItem from './UserItem';

type Props = {
  role: string
};
export default function UserGrid({role}: Required<Props>) {
  const all = useUsers();
  const users = all ? all.filter(u=>u.role === role)
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1}>
        <CreateGroupItem />
      </Grid>
      {groups.map((g, key) => (
        <Grid item xs={1} key={key}>
          <UserItem user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
