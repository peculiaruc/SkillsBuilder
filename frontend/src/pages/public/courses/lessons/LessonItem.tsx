/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { LessonType } from '../../../../interfaces/LessonType';

type Props = {
  lesson: LessonType,
};

export default function LessonItem({ lesson } : Props) {
  const {
    lesson_title, lesson_summary, lesson_no,
  } = lesson;

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
    </ListItem>
  );
}
