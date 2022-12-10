import { Stack } from '@mui/material';
import { useGetCourseAssigmentsQuery } from '../../../../apiServices/courseService';
import Loader from '../../../../components/Loader';
import { AssignmentType } from '../../../../interfaces/AssignmentType';
import { CourseType } from '../../../../interfaces/CourseType';
import Assignment from '../../../../models/Assignments';
import { useAuth } from '../../../../store/authReducer';
import EmptyView from '../../../errors/EmptyView';
import AssignmentList from '../../assignments/AssignmentList';

type Props = {
  course: CourseType
};

function CourseAssignments({ course } : Props) {
  const { user } = useAuth();
  const { data, isLoading } = useGetCourseAssigmentsQuery(course.id);
  if (isLoading) return <Loader />;
  const assignments = data?.data.assignments as AssignmentType[];
  const model = new Assignment({ author_id: user.id, course_id: course });
  model.data = { ...model.data, course };

  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {course ? (
        <AssignmentList assignments={assignments} />
      ) : (
        <EmptyView
          title="No assigment created yet. Please create a course"
          code={404}
        />
      )}
    </Stack>
  );
}

export default CourseAssignments;
