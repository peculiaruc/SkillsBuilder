import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';
import TabView from '../../../components/TabView';
import PublicCoursesList from '../courses/PublicCourseList';

function Dashboard() {
  const { isLoading } = useGetAllCoursesQuery();

  if (isLoading) { return <Loader />; }

  return (
    <TabView
      title="Community courses"
      tabs={
      [
        {
          name: 'All Courses',
          component: <PublicCoursesList />,
        },
      ]
     }

    />

  );
}

export default Dashboard;
