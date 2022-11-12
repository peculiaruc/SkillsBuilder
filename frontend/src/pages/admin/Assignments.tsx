import { Button, Paper } from '@mui/material';
import TabView from '../../components/TabView';

function Assignments() {
  return (
    <TabView
      title="My Courses"
      tabs={
      [
        {
          name: 'All',
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
              <Button size="large">All Courses</Button>
            </Paper>
          ),
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

export default Assignments;
