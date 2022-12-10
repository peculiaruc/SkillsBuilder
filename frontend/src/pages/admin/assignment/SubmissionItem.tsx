/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar, List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useGetUserByIdQuery } from '../../../apiServices/userService';
import { LoaderButton } from '../../../components/Loader';
import { SubmissionType } from '../../../interfaces/AssignmentType';
import { usePalette } from '../../../theme/theme';
import EmptyView from '../../errors/EmptyView';

type Props = {
  submission: SubmissionType,
};

export default function SubmissionItem({ submission }: Props) {
  const palette = usePalette();
  const { data, isLoading } = useGetUserByIdQuery(submission.user_id);
  if (isLoading) return <LoaderButton />;
  const user = data?.data.user;
  if (!user) return <EmptyView title="User not found" code={404} />;
  const { fullname, picture } = user;
  const { status, grade } = submission;

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <ListItem>
        <ListItemAvatar sx={{ mr: 2 }}>
          <Avatar
            src={picture}
            sx={{ width: 56, height: 56 }}
          >
            {fullname.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={fullname}
          secondary={status}
        />
        <ListItemAvatar sx={{ mr: 2 }}>
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: palette.primary.main }}
          >
            {grade}
          </Avatar>
        </ListItemAvatar>
      </ListItem>
    </List>
  );
}
