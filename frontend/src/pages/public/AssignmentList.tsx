import { Button, Paper } from '@mui/material';
import TabView from '../../components/TabView';

function AssignmentList() {
  return (
    <TabView
      title="My Assignments"
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
              <Button size="large">All Assignments</Button>
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
              <Button size="large">All Assignments in progress</Button>
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
              <Button size="large">All Assignments completed</Button>
            </Paper>
          ),
        },
      ]
     }

    />

  );
}

export default AssignmentList;
