import { Typography, Stack } from '@mui/material';

type EmptyViewProps = {
  title: string,
  code: number,
  description?: string
};

function EmptyView(props:EmptyViewProps) {
  const { title, code, description } = props;
  return (
    <Stack spacing={2}>
      <Typography>{title}</Typography>
      <Typography>{code}</Typography>
      {description && (<Typography>{description}</Typography>)}
    </Stack>
  );
}

export default EmptyView;
