import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../../apiServices/userService';
import { UserType } from '../../../interfaces/UserType';
import { useAuth } from '../../../store/authReducer';
import UserProfile from './UserProfile';

type Props = {
  user: UserType
};

export default function UserItem({ user }:Props) {
  const {
    fullname, email, id,
  } = user;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const editUser = () => navigate(`/admin/users/${id}/edit`, { state: location });

  const handleOpen = () => setOpen(true);

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    const res = await deleteUser(id).unwrap();
    toast(res.message);
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 4,
      }}
    >
      {open && (
        <UserProfile
          open={open}
          onClose={() => setOpen(false)}
          onOpen={handleOpen}
          userId={id}
        />
      )}
      <ListItem
        secondaryAction={(
          <Stack>
            <RemoveRedEye
              color="primary"
              onClick={handleOpen}
              sx={{ cursor: 'pointer' }}
            />
            {auth.user.role === 2 && (
              <>
                <Edit onClick={editUser} sx={{ cursor: 'pointer' }} color="success" />
                <Delete
                  color="error"
                  sx={{ cursor: 'pointer' }}
                  onClick={handleDeleteUser}
                />
              </>
            )}
          </Stack>
      )}
      >
        <ListItemAvatar sx={{ mr: 2 }}>
          <Avatar
            src={user.picture}
            sx={{ width: 56, height: 56 }}
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
  );
}
