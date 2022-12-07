/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import { useGetAllGroupsQuery } from '../../../apiServices/groupService';
import { useGetAuthorCoursesQuery, useGetUserGroupsQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../store/authReducer';

export default function PreloadData() {
  const { user } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading } = user.role === 2 ? useGetAllCoursesQuery() : useGetAuthorCoursesQuery(user.id);
  // eslint-disable-next-line max-len
  const { isLoading: group } = user.role === 2 ? useGetAllGroupsQuery() : useGetUserGroupsQuery(user.id);
  if (isLoading || group) return <Loader />;

  return <Outlet />;
}
