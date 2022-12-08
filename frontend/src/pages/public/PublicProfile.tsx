import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText, SwipeableDrawer,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../apiServices/userService';
import Loader from '../../components/Loader';
import { UserType } from '../../interfaces/UserType';
import EmptyView from '../errors/EmptyView';

type Props = { open: boolean, onClose: () => void, onOpen: () => void };

export default function PublicProfile({ open, onClose, onOpen } : Props) {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(Number(id));
  if (isLoading) <Loader />;
  const user = data?.data.user as UserType;
  if (!user && id) return <EmptyView title="User not found" code={404} />;
  const {
    fullname, email,
  } = user;
  return (
    <SwipeableDrawer
      anchor="right"
      onOpen={onOpen}
      open={open}
      onClose={onClose}
    >
      <List
        sx={{
          width: '100',
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={user.picture}
              sx={{ width: 100, height: 100 }}
            >
              {fullname.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={fullname}
            secondary={email}
          />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
