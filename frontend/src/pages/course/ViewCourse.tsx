import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../../apiServices/courseService';
import { CourseItem } from '../../interfaces/Course';
import EmptyView from '../errors/EmptyView';

function ViewCourse() {
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading } = useGetCourseByIdQuery(id);

  if (isLoading) return <CircularProgress />;
  if (!data?.data) return <EmptyView title="Course not found" code={404} />;

  const { name } = data.data as CourseItem;

  return (
    <h1>{name}</h1>
  );
}
export default ViewCourse;
