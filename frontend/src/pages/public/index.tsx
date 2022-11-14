import AssignmentList from './AssignmentList';
import CourseDetails from './courses/CourseDetails';
import CourseView from './courses/CourseView';
import MyGroupList from './MyGroupList';
import MyStudyPlan from './MyStudyPlan';

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
