import { Box, Container } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authReducer';
import { usePalette } from '../theme/theme';

export default function AuthLayout() {
  const palette = usePalette();
  const { token, user } = useAuth();

  if (token) {
    return user.role > 0 ? <Navigate to="/admin/overview" /> : <Navigate to="/" />;
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          padding: [2, 4],
          borderRadius: 4,
          backgroundColor: palette.background.paper,
        }}
      >
        <Outlet />
      </Box>

    </Container>
  );
}
