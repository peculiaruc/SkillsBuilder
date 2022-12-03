import { Button, Paper } from '@mui/material';
import TabView from '../../components/TabView';

function UserList() {
  return (
    <TabView
      title="Users"
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
              <Button size="large">Add course author or learner</Button>
            </Paper>
          ),
        },
        {
          name: 'Learners',
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
              <Button size="large">Add learner</Button>
            </Paper>
          ),
        },
        {
          name: 'Course authors',
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
              <Button size="large">Add course author</Button>
            </Paper>
          ),
        },
      ]
     }

    />

  );
}

export default UserList;
