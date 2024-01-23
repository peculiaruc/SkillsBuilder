import TabView from '../../../components/TabView';
import CourseList from '../course/PublicCourse';

function Dashboard() {
  return (
    <TabView
      title="Community courses"
      tabs={
      [
        {
          name: 'All Courses',
          component: <CourseList />,
        },
      ]
     }

    />

  );
}

export default Dashboard;
