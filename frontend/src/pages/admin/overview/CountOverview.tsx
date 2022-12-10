import { Paper, Stack, Typography } from '@mui/material';
import { LoaderButton } from '../../../components/Loader';

type Props = {
  title: string,
  icon: React.ReactNode,
  query: any,
  index: string
};

export default function CountOverviewItem({
  title, icon, query, index,
}:Props) {
  const { data, isLoading } = query();
  if (isLoading) return <LoaderButton />;
  const counter = data?.data?.[index].length;
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
        <Typography fontWeight="bold" variant="h2">{counter}</Typography>
        <Typography fontWeight="bold">{title}</Typography>
      </Stack>
    </Paper>
  );
}
