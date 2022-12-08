import { GroupOutlined } from '@mui/icons-material';
import {
  Button, Paper, Stack, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteGroupMutation, useJoinGroupMutation, useLeaveGroupMutation } from '../../../apiServices/groupService';
import { GroupType } from '../../../interfaces/GroupTypes';
import { useAuth } from '../../../store/authReducer';
import { useJoinedGroups } from '../../../store/groupReducer';

type Props = {
  group: GroupType
};

export default function GroupItem({ group }:Props) {
  const { name, id } = group;
  const navigate = useNavigate();
  const auth = useAuth();
  const joinedIds = useJoinedGroups();
  // console.log(joined);
  const req = {
    user_id: auth.user.id,
    group_id: id,
  };
  const isJoined = joinedIds.includes(id);
  const [leaveGroup] = useLeaveGroupMutation();
  const [joinGroup] = useJoinGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const handleJoinGroup = async () => {
    const res = await joinGroup(req).unwrap();
    toast(res.message);
  };
  const handleDeleteGroup = async () => {
    const res = await deleteGroup(id).unwrap();
    toast(res.message);
  };
  const handleLeaveGroup = async () => {
    const res = await leaveGroup(req).unwrap();
    toast(res.message);
  };
  const openGroup = () => navigate(`/group/${id}`);
  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: 'common.background',
        p: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <GroupOutlined />
        <Typography fontWeight="bold">{name}</Typography>
        {!isJoined && (<Button onClick={handleJoinGroup}>Join Group</Button>)}
        {isJoined && (
          <>
            <Button onClick={openGroup}>Open Group</Button>
            <Button color="secondary" onClick={handleLeaveGroup}>
              Leave Group
            </Button>
            {auth.user.id === group.owner_id && (
            <Button color="error" onClick={handleDeleteGroup}>Delete Group</Button>
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}
