import { Box, Stack, Typography } from '@mui/material';
import { useAuth } from '../../store/authReducer';

export default function DashboardView() {
  const auth = useAuth();

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h2" fontWeight="bold">
          Hello,
          {auth.user?.fullname}
        </Typography>
        <Typography variant="h2" fontWeight="bold">Welcome to SkillBuddy!</Typography>
      </Stack>
    </Box>
  );
}
