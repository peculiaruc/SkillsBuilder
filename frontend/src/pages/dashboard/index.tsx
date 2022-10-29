import { Box, Typography } from '@mui/material';

export default function DashboardView() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    }}
    >
      <Typography variant="h2" fontWeight="bold">Hello, Welcome to SkillBuddy!</Typography>
    </Box>
  );
}
