import { Button, Paper, useTheme } from '@mui/material';
import TabView from '../../components/TabView';
import ListAssignment from './assignments/ListAssignment';

function AssignmentIndex() {
  const theme = useTheme();
  return (
    <TabView
      title="My Assignments"
      tabs={
      [
        {
          name: 'All',
          component: <ListAssignment />,
        },
        {
          name: 'Not Passed',
          component: (
            <Paper sx={{
              height: '300px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              [theme.breakpoints.down('md')]: {
                maxHeight: 500,
              },
            }}
            >
              <Button size="large">All Assignments in progress</Button>
            </Paper>
          ),
        },
        {
          name: 'Passed',
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

export default AssignmentIndex;
