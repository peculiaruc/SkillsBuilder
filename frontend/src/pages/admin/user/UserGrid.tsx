import { Grid } from '@mui/material';
import { UserType } from '../../../interfaces/UserType';
import UserItem from './UserItem';

type Props = {
  users: UserType[],
  children?: React.ReactNode
};
export default function UserGrid({ users, children }: Props) {
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1}>
        {children}
      </Grid>
      {users.map((user) => (
        <Grid item xs={1} key={user.id}>
          <UserItem user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
