import {
  Box, Button, Container, Stack,
} from '@mui/material';
import AddMediaButton from '../../../../components/forms/AddMediaButton';
import { MediaType } from '../../../../interfaces/MediaType';
import { useAuth } from '../../../../store/authReducer';
import { useContents } from '../../../../store/lessonReducer';
import LessonContentItem from './LessonContentItem';

export default function LessonContentList() {
  const { user } = useAuth();
  const medias = [...useContents()].sort(
    (a: MediaType, b: MediaType) => a.content_position - b.content_position,
  );

  return (

    <Stack width="100%" justifyContent="center">
      <Container maxWidth="lg">
        <Stack spacing={2}>
          {medias.map(
            (content: MediaType) => <LessonContentItem key={content.id} content={content} />,
          )}
        </Stack>
      </Container>
      <Box height={60} />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          bgcolor: 'common.white',
          p: 2,
        }}
      >
        {user.role > 0 ? <AddMediaButton /> : <Button>Set as completed</Button>}
      </Stack>
    </Stack>
  );
}
