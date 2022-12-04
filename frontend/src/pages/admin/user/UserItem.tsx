import { Person3 } from '@mui/icons-material';
import { Paper, Stack, Typography } from '@mui/material';
import { UserType } from '../../../interfaces/UserType';

type Props = {
  user: UserType
};

export default function UserItem({ user }:Props) {
  const {
    fullname, phone, email,
  } = user;
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
        <Person3 fontSize="large" />
        <Typography fontWeight="bold">{fullname}</Typography>
        <Typography>
          <b>Email: </b>
          {email}
        </Typography>
        <Typography>
          <b>Phone: </b>
          {phone}
        </Typography>
      </Stack>
    </Paper>
  );
}
