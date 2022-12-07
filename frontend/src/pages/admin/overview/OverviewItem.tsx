import { Paper, Stack, Typography } from '@mui/material';

type Props = {
  title: string,
  value: string,
  icon: React.ReactNode
};

export default function OverviewItem({ title, value, icon }:Props) {
  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
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
        {icon}
        <Typography fontWeight="bold" variant="h2">{value}</Typography>
        <Typography fontWeight="bold">{title}</Typography>
      </Stack>
    </Paper>
  );
}
