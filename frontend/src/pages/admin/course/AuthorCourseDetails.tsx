import {
  Box, Grid, Paper, Stack, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import { CourseType } from '../../../interfaces/CourseType';
import EmptyView from '../../errors/EmptyView';
import CourseAssignments from './lesson/CourseAssignments';
import CourseLessonList from './lesson/CourseLessonList';

function AuthorCourseDetails() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useGetCourseByIdQuery(id);

  if (isLoading) return <Loader />;

  const course = data?.data.course as CourseType;

  if (!course) return <EmptyView title="Course not found" code={404} />;

  const { title, description } = course;

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
              // backgroundImage: `url(${thumbnail})`,
            }}
            >
              <Typography fontWeight="bold" color="common.white">{title}</Typography>
            </Box>

          </Grid>
          <Grid item xs={1}>
            <Stack spacing={2}>
              <Typography fontWeight="bold">Overview</Typography>
              <p>{description}</p>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <TabView
        title=""
        tabs={
            [
              {
                name: 'Course lessons',
                component: <CourseLessonList course={course} />,
              },
              {
                name: 'Assignments',
                component: <CourseAssignments course={course} />,
              },
            ]
        }
      />
    </Stack>
  );
}

export default AuthorCourseDetails;
