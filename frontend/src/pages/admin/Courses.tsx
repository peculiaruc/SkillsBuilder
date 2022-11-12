import { Button, Container, Stack } from '@mui/material';
import Header from './Header';

function Courses() {
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Header name="Courses" />
      <Container sx={{
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'secondary.main',
        borderRadius: 2,
      }}
      >
        <Button size="large">Create Course</Button>
      </Container>
    </Stack>
  );
}

export default Courses;
