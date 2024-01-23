/* eslint-disable @typescript-eslint/naming-convention */
import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar, ListItem, ListItemAvatar, ListItemText,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteLessonMutation, useUpdateLessonMutation } from '../../../../apiServices/lessonService';
import MixedForm from '../../../../components/forms/MixedForm';
import { LoaderButton } from '../../../../components/Loader';
import { LessonType } from '../../../../interfaces/LessonType';
import Lesson from '../../../../models/Lesson';

type Props = {
  lesson: LessonType,
};

export default function LessonItem({ lesson } : Props) {
  const {
    lesson_title, lesson_summary, lesson_no, id,
  } = lesson;

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();

  const handleDeleteLesson = async () => {
    const res = await deleteLesson(id).unwrap();
    toast(res.message);
  };

  const editForm = (
    <MixedForm
      title="Edit"
      dialog={false}
      model={new Lesson({ ...lesson })}
      loading={isLoading}
      mutation={updateLesson}
      onCancel={() => setEdit(false)}
    />
  );

  const showLesson = (
    <ListItem
      sx={{ bgcolor: 'background.paper', width: '100%', borderRadius: 2 }}
      secondaryAction={(
        <Stack>
          <Edit onClick={() => navigate(`/admin/lesson/${id}/edit`)} sx={{ cursor: 'pointer' }} color="success" />
          {isDeleting ? <LoaderButton /> : (
            <Delete
              color="error"
              sx={{ cursor: 'pointer' }}
              onClick={handleDeleteLesson}
            />
          )}
        </Stack>
  )}
    >
      <ListItemAvatar>
        <Avatar>{lesson_no}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={lesson_title}
        secondary={lesson_summary}
      />
    </ListItem>
  );

  return (edit ? editForm : showLesson);
}
