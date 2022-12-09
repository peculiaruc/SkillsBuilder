import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { CourseLessonType } from '../../../interfaces/LessonType';

type Props = {
  lesson: CourseLessonType;
};

function ListItemLesson({ lesson }: Props) {
  const {
    lesson_content,
    lesson_content_type,
    lesson_summary,
    lesson_title,
    lesson_no,
    course_id,
  } = lesson;
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // const navigate = useNavigate();

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        p: 2,
        borderRadius: 2,
        maxHeight: 200,
      }}
    >
      <Grid container columns={[1, 3, 5]} spacing={2}>
        <Grid item xs={1} sm={2} md={2}>
          <Box
            sx={{
              ...style,
              bgcolor: 'primary.main',
              height: '100%',
              borderRadius: 2,
              p: 3,
              // backgroundImage: `url(${thumbnail})`,
            }}
          >
            <Typography fontWeight="bold" color="common.white">
              {lesson_title}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={2}
          sx={{ ...style, justifyContent: 'flex-start' }}
        >
          <p>{lesson_summary.substring(0, 250)}</p>
        </Grid>
        <Grid item xs={1} sm={1} md={1} sx={style}>
          <Stack spacing={2}>
            <Button>View Lesson</Button>
            {/* <Button
              onClick={() => navigate(`/admin/courses/${id}/assignments`)}
            >
              Assignments
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ListItemLesson;
