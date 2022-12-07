import { Divider, Stack, Typography } from '@mui/material';
import { PostType } from '../../../interfaces/PostType';
import { useAuth } from '../../../store/authReducer';

export type Props = {
  feed: PostType
};

export default function GroupFeedItem({ feed }: Props) {
  // const { user } = useAuth();
  const { title, content } = feed;

  return (
    <Stack spacing={2} sx={{ width: '100%', bgcolor: 'background.paper', border: 1 }}>
      <Typography variant="h2">{title}</Typography>
      <Divider />
      <Typography paragraph>
        {content}
      </Typography>
    </Stack>
  );
}
