import { Grid } from '@mui/material';
import { UserType } from '../../../interfaces/UserType';
import UserItem from './UserItem';

type Props = {
  users: UserType[],
  children?: React.ReactNode
};
export default function UserGrid({ users, children }: Props) {
  return (
    <Grid container columns={[1, 2, 3]} spacing={1}>
      { children && (
      <Grid item xs={1}>
        {children}
      </Grid>
      )}
      {users.map((user) => (
        <Grid item xs={1} key={user.id} p={1}>
          <UserItem user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
