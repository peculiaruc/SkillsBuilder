import { Group, Person, School } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useCourses } from '../../../store/courseReducer';
import { useGroups } from '../../../store/groupReducer';
import OverviewItem from './OverviewItem';

export default function Overview() {
  const groups = useGroups();
  const courses = useCourses();
  return (
    <Grid container columns={[1, 2, 3, 4]} spacing={2}>
      <Grid item xs={1}>
        <OverviewItem
          title="Groups"
          value={`${groups.length}`}
          icon={<Group fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Courses"
          value={`${courses.length}`}
          icon={<Person fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Lessons"
          value="150"
          icon={<School fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Authors"
          value="500"
          icon={<Person fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Learners"
          value="200"
          icon={<School fontSize="large" />}
        />
      </Grid>
      <Grid item xs={1}>
        <OverviewItem
          title="Assignments"
          value="300"
          icon={<School fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}
