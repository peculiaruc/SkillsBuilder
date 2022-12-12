import { List, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [createLesson, { isLoading: createStatus }] = useCreateLessonMutation();
  const { data, isLoading } = useGetCourseLessonsQuery(course.id);

  if (isLoading) return <Loader />;

  const lessons = data?.data.lessons as LessonType[];

  const onCancel = (values?: FormikValues) => {
    const lesson = values as LessonType;
    if (lesson && lesson.id) navigate(`/lesson/${lesson.id}/edit`);
  };

  return (
    <Stack spacing={2}>
      <MixedForm
        dialog
        title="Create Lesson"
        model={new Lesson({ course_id: id })}
        loading={createStatus}
        mutation={createLesson}
        onCancel={onCancel}
      />
      <List>
        <Stack spacing={2}>
          {lessons.map((lesson) => <LessonItem lesson={lesson} key={lesson.id} />)}
        </Stack>
      </List>
    </Stack>
  );
}
