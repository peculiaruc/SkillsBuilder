import { CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';

export default function PreloadData() {
  const { isLoading } = useGetAllCoursesQuery();
  if (isLoading) return <CircularProgress />;

  return <Outlet />;
}
