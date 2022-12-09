import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useCreateCourseMutation } from '../../../apiServices/courseService';
// import { useGetAuthorCoursesQuery } from '../../../apiServices/userService';
import { useGetCourseLessonsQuery } from '../../../apiServices/lessonService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CourseType } from '../../../interfaces/CourseType';
import {
  CourseLessonType,
  GetLessonResponse,
} from '../../../interfaces/LessonType';
import Lesson from '../../../models/Lesson';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';
// import ListItemCourse from './ListItemCourse';
import ListItemLesson from './ListItemLesson';

function LessonList() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const auth = useAuth();

  const model = new Lesson();

  const handleOpen = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  // const [createCourse] = useCreateCourseMutation();
  const { data: resp, isLoading } = useGetCourseLessonsQuery(Number(id));

  console.log('resp', resp);

  if (isLoading) {
    return <CircularProgress />;
  }

  //   const onSubmit = async (values: FormikValues) => {
  //     const data = { ...values, author_id: auth.user.id } as unknown;
  //     await createCourse(data as CourseType).unwrap();
  //     onCancel();
  //     toast('Course created successfully');
  //   };
  //
  /*
  const onSubmit = async (values: FormikValues) => {
    const course = values as CourseType;
    course.id = Math.round(Math.random() * 100);
    batch(
      () => {
        dispatch(addCourse(course));
        onCancel();
      },
    );
    Toastify({
      text: 'Course created successfully',
    });
  };
*/
  return (
    <Stack spacing={2} display="flex" sx={{ width: '100%' }}>
      {auth.user.role > 0 && (
        <>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleOpen}>
            Create lesson
          </Button>
          <FormBuilder
            dialog
            title="Create Lesson"
            onSubmit={() => console.log('create lesson')}
            onCancel={onCancel}
            model={model}
          />
        </>
      )}
      {resp?.data?.lessons.map((lesson: CourseLessonType) => (
        <ListItemLesson lesson={lesson} key={lesson.id} />
      ))}
    </Stack>
  );
}

export default LessonList;
