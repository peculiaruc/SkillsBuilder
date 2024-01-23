import { Typography, Stack } from '@mui/material';

type EmptyViewProps = {
  title: string,
  code: number,
  description?: string
};

function EmptyView(props:EmptyViewProps) {
  const { title, code, description } = props;
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        bgcolor: 'background.paper',
      }}
    >
      <Typography fontWeight="bold" pb={2}>{title}</Typography>
      <Typography variant="h2">{code}</Typography>
      {description && (<Typography>{description}</Typography>)}
    </Stack>
  );
}

export default EmptyView;
