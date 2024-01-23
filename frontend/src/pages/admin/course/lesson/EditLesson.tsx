import { useParams } from 'react-router-dom';
import { useGetLessonContentQuery } from '../../../../apiServices/lessonService';
import Loader from '../../../../components/Loader';
import TabView from '../../../../components/TabView';
import LessonContentList from './LessonContentList';

export default function EditLesson() {
  const { id } = useParams();
  const { data, isLoading } = useGetLessonContentQuery(Number(id));
  if (isLoading) return <Loader />;
  const lesson = data?.data.lesson;
  return (
    <TabView
      title={lesson?.lesson_title}
      tabs={[
        {
          name: 'Content',
          component: <LessonContentList />,
        },
      ]}
    />

  );
}
