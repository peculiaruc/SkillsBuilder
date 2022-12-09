import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetLessonByIdQuery } from '../../../apiServices/lessonService';
import { CourseLessonType } from '../../../interfaces/LessonType';
import ReactPlayer from 'react-player'

export default function ViewLesson() {
  const { id } = useParams();
  const { data: resp, isLoading } = useGetLessonByIdQuery(Number(id));
  console.log('2', resp);

  const lesson = resp?.data?.lesson ?? || []

  return (
    <>
      <div>{lesson.lesson_title}</div>
      {
        lesson.lesson_content_type === 'video' ?
        <ReactPlayer url={lesson.lesson_content} />
        :null
      }
    </>
  );
}
