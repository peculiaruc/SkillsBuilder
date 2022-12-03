import {
  Box, Button, CircularProgress, Grid, Paper, Stack, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEnrolleInOneCourseMutation, useGetCourseByIdQuery, useGetEnrolledCoursesQuery } from '../../../apiServices/courseService';
import TabView from '../../../components/TabView';
import { CourseType, EnrolledCourseType } from '../../../interfaces/CourseType';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';

function CourseDetails() {
  const params = useParams();
  const id = Number(params.id);
  const auth = useAuth();

  const { data, isLoading: CourseLoading } = useGetCourseByIdQuery(id);

  const { data: enrolled, isLoading } = useGetEnrolledCoursesQuery({
    user_id: auth.user.id,
  });

  const [enroleInCourse] = useEnrolleInOneCourseMutation();

  if (isLoading || CourseLoading) return <CircularProgress />;

  const course = data?.data.course as CourseType;

  const isEnrolled = !((enrolled
       // eslint-disable-next-line max-len
       && !enrolled.data?.courses?.find((c:EnrolledCourseType) => c.course_id === id)) || !enrolled);

  if (!course) return <EmptyView title="Course not found" code={404} />;

  const { name, summary, thumbnail } = course;

  const handdleEnroll = async (cours: CourseType) => {
    await enroleInCourse({
      user_id: auth.user.id,
      course_id: cours.id,
      course_name: cours.name,
    }).unwrap();
    toast('Successfully enrolled');
  };

  const style = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
  return (
    <Stack spacing={2} width="100%">
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
              <Typography fontWeight="bold" color="common.white">{name}</Typography>
            </Box>

          </Grid>
          <Grid item xs={1}>
            <Stack spacing={2}>
              <Typography fontWeight="bold">Overview</Typography>
              <p>{summary}</p>
              {!isEnrolled ? (
                <Button onClick={() => handdleEnroll(course)}>
                  Enroll now
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
