import { GroupOutlined } from '@mui/icons-material';
import {
  Button, Paper, Stack, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { GroupType } from '../../../interfaces/GroupTypes';
import { joinGroup, leaveGroup, useJoinedGroups } from '../../../store/groupReducer';

type Props = {
  group: GroupType
};

export default function GroupItem({ group }:Props) {
  const joined = useJoinedGroups() ?? [];
  const { name, id } = group;
  const isJoined = joined.includes(id);
  const dispatch = useDispatch();
  const handleJoinGroup = (groupId: number) => dispatch(joinGroup(groupId));
  const handleLeaveGroup = (groupId: number) => dispatch(leaveGroup(groupId));
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
        {!isJoined && (<Button onClick={() => handleJoinGroup(id)}>Join Group</Button>)}
        {isJoined && (
        <>
          <Button>Open Group</Button>
          <Button color="error" onClick={() => handleLeaveGroup(id)}>
            Leave Group
          </Button>
        </>

        )}
      </Stack>
    </Paper>
  );
}
