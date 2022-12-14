/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar, Button, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LessonType } from '../../../../interfaces/LessonType';

type Props = {
  lesson: LessonType,
};

export default function LessonItem({ lesson } : Props) {
  const {
    lesson_title, lesson_summary, lesson_no, id,
  } = lesson;
  const navigate = useNavigate();
  return (
    <ListItem
      sx={{ bgcolor: 'background.paper', width: '100%', borderRadius: 2 }}
    >
      <ListItemAvatar>
        <Avatar>{lesson_no}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={lesson_title}
        secondary={lesson_summary}
      />
      <Button onClick={() => navigate(`/lesson/${id}`)}>Start</Button>
    </ListItem>
  );
}
