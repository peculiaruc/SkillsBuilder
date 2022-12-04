import { Outlet } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';

export default function PreloadData() {
  const { isLoading } = useGetAllCoursesQuery();
  if (isLoading) return <Loader />;

  return <Outlet />;
}
