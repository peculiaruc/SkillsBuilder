/* eslint-disable react-hooks/rules-of-hooks */
import { Group, Person, School } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import { useGetAllGroupsQuery } from '../../../apiServices/groupService';
import { useGetAuthorLearnersQuery, useGetUsersByRoleQuery } from '../../../apiServices/userService';
import { useAuth } from '../../../store/authReducer';
import CountOverviewItem from './CountOverview';

export default function Overview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const { data: allMc, isLoading: mg } = useGetGroupByIdQuery(user.id);
  // const { data: allMyC, isLoading: mc } = useGetUserCoursesQuery(user.id);
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1} onClick={() => navigate('/admin/groups')} sx={{ cursor: 'pointer' }}>
        <CountOverviewItem
          title="Groups"
          query={useGetAllGroupsQuery}
          index="groups"
          icon={<Group fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1} onClick={() => navigate(user.role !== 2 ? '/admin/courses/me' : '/admin/courses')} sx={{ cursor: 'pointer' }}>
        <CountOverviewItem
          title="Courses"
          query={useGetAllCoursesQuery}
          index="courses"
          icon={<Person fontSize="large" />}
        />
      </Grid>
      {/* <Grid item xs={1}>
        <OverviewItem
          title="Lessons"
          value="10"
          icon={<School fontSize="large" />}
        />
      </Grid> */}
      {
        user.role === 1 && (
          <Grid item xs={1} onClick={() => navigate('/admin/learners')} sx={{ cursor: 'pointer' }}>
            <CountOverviewItem
              title="Learners"
              query={() => useGetAuthorLearnersQuery(user.id)}
              index="learners"
              icon={<School fontSize="large" />}
            />
          </Grid>
        )
      }
      {
        user.role > 1 && (
          <>
            <Grid item xs={1} onClick={() => navigate('/admin/users')} sx={{ cursor: 'pointer' }}>
              <CountOverviewItem
                title="Course Authors"
                query={() => useGetUsersByRoleQuery('authors')}
                index="users"
                icon={<School fontSize="large" />}
              />
            </Grid>
            <Grid item xs={1} onClick={() => navigate('/admin/users')} sx={{ cursor: 'pointer' }}>
              <CountOverviewItem
                title="Learners"
                query={() => useGetUsersByRoleQuery('learners')}
                index="users"
                icon={<School fontSize="large" />}
              />
            </Grid>
          </>
        )
      }
      {/* <Grid item xs={1}>
        <OverviewItem
          title="Assignments"
          value="17"
          icon={<School fontSize="large" />}
        />
      </Grid> */}
    </Grid>
  );
}
