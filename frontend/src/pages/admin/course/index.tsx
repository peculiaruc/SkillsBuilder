import CourseDetails from '../../public/courses/CourseDetails';
import AssignmentList from '../assignment/AssignmentList';
import CourseList from './CourseList';

const courseRoutes = {
  path: 'courses',
  children: [
    {
      index: true,
      element: <CourseList />,
    },
    {
      path: ':id',
      element: <CourseDetails />,
    },
    {
      path: ':id/assignments',
      element: <AssignmentList />,
    },
  ],
};

export default courseRoutes;
