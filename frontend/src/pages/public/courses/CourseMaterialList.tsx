import { List, ListItem, ListItemText } from '@mui/material';
import { useGetCourseMaterialsQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';
import { CourseType } from '../../../interfaces/CourseType';
import EmptyView from '../../errors/EmptyView';

type Props = {
  course: CourseType
};

export default function CourseMaterial({ course } : Required<Props>) {
  const { data, isLoading } = useGetCourseMaterialsQuery(course.id);

  if (isLoading) return <Loader />;

  const materials = data?.data.materials;

  if (!materials) return <EmptyView title="Course Materials not found" code={404} />;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {materials.map((material) => (
        <ListItem key={material.id}>
          <ListItemText>{material.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
