import {
  Flag, LinkedIn, LocationCity, Phone,
} from '@mui/icons-material';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText, SwipeableDrawer,
} from '@mui/material';
import { useGetUserByIdQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { UserType } from '../../../interfaces/UserType';
import EmptyView from '../../errors/EmptyView';

  type Props = { userId: number, open: boolean, onClose: () => void, onOpen: () => void };

export default function UserProfile({
  open, onClose, onOpen, userId,
} : Props) {
  const { data, isLoading } = useGetUserByIdQuery(userId);
  if (isLoading) <Loader />;
  const user = data?.data.user as UserType;
  if (!user) return <EmptyView title="User not found" code={404} />;
  const {
    fullname, email, phone, country, city, linkedin,
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
              sx={{ width: 50, height: 50 }}
            >
              {fullname.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={fullname}
            secondary={email}
          />
        </ListItem>
        {phone && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Phone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Phone"
            secondary={phone}
          />
        </ListItem>
        )}
        {country && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Flag />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Country"
            secondary={country}
          />
        </ListItem>
        )}
        {city && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationCity />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="City"
            secondary={city}
          />
        </ListItem>
        )}
        {linkedin && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LinkedIn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="LinkedIn"
            secondary={linkedin}
          />
        </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
}
