import { List, Stack } from '@mui/material';
import { useGetCourseLessonsQuery } from '../../../../apiServices/courseService';
import Loader from '../../../../components/Loader';
import { CourseType } from '../../../../interfaces/CourseType';
import { LessonType } from '../../../../interfaces/LessonType';
import LessonItem from './LessonItem';

type Props = {
  course: CourseType
};

export default function CourseLessonList({ course } : Props) {
  const { data, isLoading } = useGetCourseLessonsQuery(course.id);

  if (isLoading) return <Loader />;

  const lessons = data?.data.lessons as LessonType[];

  return (
    <Stack spacing={2}>
      <List>
        <Stack spacing={2}>
          {lessons.map((lesson) => <LessonItem lesson={lesson} key={lesson.id} />)}
        </Stack>
      </List>
    </Stack>
  );
}
