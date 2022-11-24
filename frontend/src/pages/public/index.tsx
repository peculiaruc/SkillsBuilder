import AssignmentList from './AssignmentIndex';
import CourseDetails from './courses/CourseDetails';
import CourseList from './courses/CourseList';
import MyGroupList from './MyGroupList';
import MyStudyPlan from './MyStudyPlan';

export default [
  {
    path: '/my-courses',
    element: <CourseList />,
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
