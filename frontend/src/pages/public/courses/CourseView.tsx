import { Button, CircularProgress, Paper } from '@mui/material';
import { useGetAllCourseQuery, useGetEnrolledCoursesQuery } from '../../../apiServices/courseService';
import TabView from '../../../components/TabView';
import { useAuth } from '../../../store/authReducer';
import CourseList from './CourseList';

function CourseView() {
  const auth = useAuth();

  const { isLoading } = useGetAllCourseQuery();

  const { isLoading: isLoadingEnroll } = useGetEnrolledCoursesQuery({
    user_id: auth.user.id,
  });

  if (isLoading || isLoadingEnroll) { return <CircularProgress />; }

  return (
    <TabView
      title="My Courses"
      tabs={
      [
        {
          name: 'All',
          component: <CourseList />,
        },
        {
          name: 'In Progress',
          component: (
            <Paper sx={{
              height: '300px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
            }}
            >
              <Button size="large">All Courses in progress</Button>
            </Paper>
          ),
        },
        {
          name: 'Completed',
          component: (
            <Paper sx={{
              height: '300px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
            }}
            >
              <Button size="large">All Courses completed</Button>
            </Paper>
          ),
        },
      ]
     }

    />

  );
}

export default CourseView;
