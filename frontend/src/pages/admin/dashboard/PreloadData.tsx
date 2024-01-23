/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet } from 'react-router-dom';

export default function PreloadData() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { isLoading } = user.role === 2 ? useGetAllCoursesQuery() : useGetAuthorCoursesQuery(user.id);
  // eslint-disable-next-line max-len
  // const { isLoading: group } = user.role === 2 ? useGetAllGroupsQuery() : useGetUserGroupsQuery(user.id);
  // if (isLoading || group) return <Loader />;

  return <Outlet />;
}
