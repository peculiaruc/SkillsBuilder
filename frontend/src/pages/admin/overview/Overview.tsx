/* eslint-disable react-hooks/rules-of-hooks */
import { Group, Person, School } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import { useGetAllGroupsQuery } from '../../../apiServices/groupService';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../store/authReducer';
import OverviewItem from './OverviewItem';

export default function Overview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: allG, isLoading: ag } = useGetAllGroupsQuery();
  // const { data: allMc, isLoading: mg } = useGetGroupByIdQuery(user.id);
  const { data: allC, isLoading: ac } = useGetAllCoursesQuery();
  // const { data: allMyC, isLoading: mc } = useGetUserCoursesQuery(user.id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (ag || ac) return <Loader />;
  const aGroup = allG?.data.groups ?? [];
  // const mGroup = allMc?.data.groups ?? [];
  const aCourses = allC?.data.courses ?? [];
  // const mCourses = allMyC?.data.courses ?? [];
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1} onClick={() => navigate('/admin/groups')} sx={{ cursor: 'pointer' }}>
        <OverviewItem
          title="Groups"
          value={`${aGroup.length}`}
          icon={<Group fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1} onClick={() => navigate(user.role !== 2 ? '/admin/courses/me' : '/admin/courses')} sx={{ cursor: 'pointer' }}>
        <OverviewItem
          title="Courses"
          value={`${aCourses.length}`}
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
