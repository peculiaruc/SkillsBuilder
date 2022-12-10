import { List, Stack } from '@mui/material';
import { useGetCourseLessonsQuery } from '../../../../apiServices/courseService';
import { useCreateLessonMutation } from '../../../../apiServices/lessonService';
import MixedForm from '../../../../components/forms/MixedForm';
import Loader from '../../../../components/Loader';
import { CourseType } from '../../../../interfaces/CourseType';
import { LessonType } from '../../../../interfaces/LessonType';
import Lesson from '../../../../models/Lesson';
import LessonItem from './LessonItem';

type Props = {
  course: CourseType
};

export default function CourseLessonList({ course } : Props) {
  const { id } = course;
  const [createLesson, { isLoading: createStatus }] = useCreateLessonMutation();
  const { data, isLoading } = useGetCourseLessonsQuery(course.id);

  if (isLoading) return <Loader />;

  const lessons = data?.data.lessons as LessonType[];

  return (
    <Stack spacing={2}>
      <MixedForm
        dialog
        title="Create Lesson"
        model={new Lesson({ course_id: id })}
        loading={createStatus}
        mutation={createLesson}
      />
      <List>
        <Stack spacing={2}>
          {lessons.map((lesson) => <LessonItem lesson={lesson} key={lesson.id} />)}
        </Stack>
      </List>
    </Stack>
  );
}
