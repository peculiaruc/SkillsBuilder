import React from 'react';
import { Outlet } from 'react-router-dom';
import { alpha, Box } from '@mui/material';
import { usePalette } from '../theme/theme';

export default function BackgroundLayout() {
  const palette = usePalette();
  return (
    <Box
      sx={{
        backgroundColor: alpha(palette.primary.main, 0.1),
        width: '100%',
        height: '100%',
      }}
    >
      <Outlet />
    </Box>
  );
}
