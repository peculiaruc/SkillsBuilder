import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { usePalette } from '../theme/theme';

export default function AuthLayout() {
  const palette = usePalette();
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
