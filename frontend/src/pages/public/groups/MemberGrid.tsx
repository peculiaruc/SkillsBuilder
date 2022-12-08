import { Grid } from '@mui/material';
import { UserType } from '../../../interfaces/UserType';
import MemberItem from './MemberItem';

type Props = {
  users: UserType[],
};
export default function MemberGrid({ users }: Props) {
  return (
    <Grid container columns={[1, 1, 2, 3]} spacing={1}>
      {users.map((user) => (
        <Grid item xs={1} key={user.id} p={1}>
          <MemberItem user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
