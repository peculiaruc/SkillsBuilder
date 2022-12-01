import AssignmentList from './AssignmentIndex';
import CourseDetails from './courses/CourseDetails';
import CourseView from './courses/CourseView';
import MyGroupList from './groups/MyGroupList';
import MyStudyPlan from './groups/MyStudyPlan';

export default [
  {
    path: '/my-courses',
    element: <CourseView />,
  },
  {
    path: '/my-assignments',
    element: <AssignmentList />,
  },
  {
    path: '/my-study-plan',
    element: <MyStudyPlan />,
  },
  {
    path: '/my-groups',
    element: <MyGroupList />,
  },
  {
    path: '/course/:id',
    element: <CourseDetails />,
  },
];
