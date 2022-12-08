/* eslint-disable @typescript-eslint/naming-convention */
import { Delete, RemoveRedEye } from '@mui/icons-material';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLeaveGroupMutation } from '../../../apiServices/groupService';
import { UserType } from '../../../interfaces/UserType';
import { useAuth } from '../../../store/authReducer';
import { useGroup } from '../../../store/groupReducer';
import UserProfile from '../../admin/user/UserProfile';

type Props = {
  user: UserType,
};

export default function MemberItem({ user }: Props) {
  const group = useGroup();
  const { fullname, email, id } = user;
  const [open, setOpen] = useState<boolean>(false);
  const auth = useAuth();
  const handleOpen = () => setOpen(true);
  const [leaveGroup] = useLeaveGroupMutation();
  const removeUserFromGroup = async () => {
    const res = await leaveGroup({
      group_id: group.id,
      user_id: id,
    }).unwrap();
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
            {
              (auth.user.id !== id && (auth.user.role > 1 || group.owner_id === auth.user.id)) && (
                <Delete
                  color="error"
                  sx={{ cursor: 'pointer' }}
                  onClick={removeUserFromGroup}
                />
              )
            }
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
