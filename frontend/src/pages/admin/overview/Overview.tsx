/* eslint-disable react-hooks/rules-of-hooks */
import { Group, Person, School } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/authReducer';
import { useCourses, useEnrolledCourses } from '../../../store/courseReducer';
import { useGroups, useJoinedGroups } from '../../../store/groupReducer';
import OverviewItem from './OverviewItem';

export default function Overview() {
  const { user } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const courses = user.role !== 0 ? useCourses() : useEnrolledCourses();
  const groups = user.role === 2 ? useGroups() : useJoinedGroups();
  const navigate = useNavigate();

  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1} onClick={() => navigate('/admin/groups')} sx={{ cursor: 'pointer' }}>
        <OverviewItem
          title="Groups"
          value={`${groups.length}`}
          icon={<Group fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1} onClick={() => navigate(user.role !== 2 ? '/admin/courses/me' : '/admin/courses')} sx={{ cursor: 'pointer' }}>
        <OverviewItem
          title="Courses"
          value={`${courses.length}`}
          icon={<Person fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Lessons"
          value="10"
          icon={<School fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Authors"
          value="15"
          icon={<Person fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Learners"
          value="20"
          icon={<School fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Assignments"
          value="17"
          icon={<School fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}
