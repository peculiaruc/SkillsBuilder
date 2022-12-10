/* eslint-disable @typescript-eslint/no-shadow */
import {
  Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { useGetAuthorLearnersQuery } from '../../apiServices/userService';
import Loader from '../../components/Loader';
import { UserType } from '../../interfaces/UserType';
import { useAuth } from '../../store/authReducer';

export default function AuthorLearners() {
  const { user } = useAuth();
  const { data, isLoading } = useGetAuthorLearnersQuery(user.id);
  if (isLoading) return <Loader />;
  const users = data?.data.learners as UserType[];
  return (
    <Grid container columns={[1, 2, 3]} spacing={1}>
      {users && users.map((user) => (
        <Grid item xs={1} key={user.id} p={1}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              borderRadius: 4,
            }}
          >
            <ListItem>
              <ListItemAvatar sx={{ mr: 2 }}>
                <Avatar
                  src={user.picture}
                  sx={{ width: 56, height: 56 }}
                >
                  {user.fullname.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.fullname}
                secondary={user.email}
              />
            </ListItem>
          </List>
        </Grid>
      ))}
    </Grid>
  );
}
