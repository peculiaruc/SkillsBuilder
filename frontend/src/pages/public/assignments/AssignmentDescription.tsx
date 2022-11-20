import { Chip, Stack, Typography } from '@mui/material';
import React from 'react';

export default function AssignmentDescription() {
  return (
    <Stack p={2}>
      <Typography fontWeight="bold">Course:  Cloud Computing Basic Test</Typography>
      <Typography paragraph>
        <b>Description : </b>
        Evaluate the basic knowedge of cloud
        computing models and providers.
      </Typography>
      <Typography fontWeight="bold">
        <Chip label="Max Score : 82" variant="outlined" />
        <Chip label="Attempts : 2/5" variant="outlined" />
        <Chip label={`Date : ${new Date().toLocaleString()}`} variant="outlined" />
      </Typography>
    </Stack>
  );
}
