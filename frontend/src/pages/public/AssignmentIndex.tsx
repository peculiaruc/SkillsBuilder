import TabView from '../../components/TabView';
import ListAssignment from './assignments/ListAssignment';
import ListAssignmentFailed from './assignments/ListAssignmentFailed';
import ListAssignmentPassed from './assignments/ListAssignmentPassed';

function AssignmentIndex() {
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
          component: <ListAssignmentFailed />,
        },
        {
          name: 'Passed',
          component: <ListAssignmentPassed />,
        },
      ]
     }

    />

  );
}

export default AssignmentIndex;
