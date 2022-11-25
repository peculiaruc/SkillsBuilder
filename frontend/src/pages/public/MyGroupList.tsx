import { Button, Paper } from '@mui/material';
import TabView from '../../components/TabView';

function MyGroupList() {
  return (
    <TabView
      title="My Groups"
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
              <Button size="large">All Groups</Button>
            </Paper>
          ),
        },
        {
          name: 'My Groups',
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
              <Button size="large">All Groups in progress</Button>
            </Paper>
          ),
        },
        {
          name: 'Joined groups',
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
              <Button size="large">All Groups completed</Button>
            </Paper>
          ),
        },
      ]
     }

    />

  );
}

export default MyGroupList;
