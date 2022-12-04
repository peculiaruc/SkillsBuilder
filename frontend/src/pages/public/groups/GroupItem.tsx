import { GroupOutlined } from '@mui/icons-material';
import {
  Button, Paper, Stack, Typography
} from '@mui/material';
import { useJoinGroupMutation, useLeaveGroupMutation } from '../../../apiServices/groupService';
import { GroupType } from '../../../interfaces/GroupTypes';
import { useAuth } from '../../../store/authReducer';
import { useJoinedGroups } from '../../../store/groupReducer';

type Props = {
  group: GroupType
};

export default function GroupItem({ group }:Props) {
  const { name, id } = group;
  const auth = useAuth();
  const joined = useJoinedGroups();
  console.log(joined);
  const req = {
    user_id: auth.user.id,
    group_id: id,
  };
  const isJoined = false; // joined.includes.(id);
  const [leaveGroup] = useLeaveGroupMutation();
  const [joinGroup] = useJoinGroupMutation();
  const handleJoinGroup = async () => {
    await joinGroup(req);
  };
  const handleLeaveGroup = async () => {
    await leaveGroup(req);
  };
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
          <Button>Open Group</Button>
          <Button color="error" onClick={handleLeaveGroup}>
            Leave Group
          </Button>
        </>

        )}
      </Stack>
    </Paper>
  );
}
