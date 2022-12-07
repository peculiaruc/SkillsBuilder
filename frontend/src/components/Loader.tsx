import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{
      width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <CircularProgress />
    </Box>
  );
}
