import PublicCourse from '../admin/course/PublicCourse';
import CourseDetails from './courses/CourseDetails';
import MyCourse from './courses/MyCourse';
import GroupDetails from './groups/GroupDetails';
import MyGroupList from './groups/MyGroupList';
// import MyStudyPlan from './groups/MyStudyPlan';
import Profile from './Profile';

export default [
  {
    path: '/courses',
    element: <PublicCourse />,
  },
  {
    path: '/my-courses',
    element: <MyCourse />,
  }, /*
  {
    path: '/my-study-plan',
    element: <Editor />,
  }, */
  {
    path: '/my-groups',
    element: <MyGroupList />,
  },
  {
    path: '/course/:id',
    element: <CourseDetails />,
  },
  {
    path: '/group/:id',
    element: <GroupDetails />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
];
