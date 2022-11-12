import {
  Box, Button, CircularProgress, Grid, Paper, Stack, Typography,
} from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEnrolleInOneCourseMutation, useGetEnrolledCoursesQuery } from '../../../apiServices/courseService';
import TabView from '../../../components/TabView';
import { CourseItem } from '../../../interfaces/Course';
import { useAuth } from '../../../store/authReducer';
import { useCourses } from '../../../store/courseReducer';

function CourseDetails() {
  const params = useParams();
  const id = params.id as string;
  // const { data, isLoading } = useGetOneCourseQuery(id as string);
  const auth = useAuth();
  const { data: enrolled, isLoading } = useGetEnrolledCoursesQuery({
    user_id: auth?.user?.id,
  });
  const courses = useCourses();

  const [enroleInCourse] = useEnrolleInOneCourseMutation();

  if (isLoading) return <CircularProgress />;

  const course = courses.find((c:CourseItem) => Number(c.id) === Number(id)) as CourseItem;

  if (!course) {
    return <Navigate to="/my-courses" />;
  }

  if (!enrolled) return <Typography>Course Not found</Typography>;

  const isEnrolled = enrolled.data?.courses.find(
    (c:CourseItem) => Number(c.course_id) === Number(id),
  );

  const { name, summary, thumbnail } = course;

  const handdleEnroll = async (cours: CourseItem) => {
    await enroleInCourse({
      user_id: auth.user.id,
      course_id: cours.id,
      course_name: cours.name,
    }).unwrap();
    toast('Successfully enrolled');
  };

  const style = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
  return (
    <Stack spacing={2}>
      <Paper sx={{
        width: '100%',
        height: '100%',
        p: 2,
        borderRadius: 2,
      }}
      >
        <Grid container columns={[1, 2]} spacing={2}>
          <Grid item xs={1}>
            <Box sx={{
              ...style,
              bgcolor: 'primary.main',
              height: '100%',
              borderRadius: 2,
              p: 3,
              backgroundImage: `url(${thumbnail})`,
            }}
            >
              <Typography fontWeight="bold">{name}</Typography>
            </Box>

          </Grid>
          <Grid item xs={1}>
            <Stack spacing={2}>
              <Typography fontWeight="bold">Overview</Typography>
              <p>{summary}</p>
              {!isEnrolled ? (
                <Button onClick={() => handdleEnroll(course)}>
                  Enrole now
                </Button>
              ) : <Button>Start Course</Button>}
            </Stack>
          </Grid>

        </Grid>

      </Paper>

      <TabView
        title=""
        tabs={
            [
              {
                name: 'Course Information',
                component: <>.</>,
              },
              {
                name: 'Course Outline',
                component: <>.</>,
              },
            ]
        }
      />
    </Stack>
  );
}

export default CourseDetails;
