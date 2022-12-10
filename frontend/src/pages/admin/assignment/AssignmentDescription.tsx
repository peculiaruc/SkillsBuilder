/* eslint-disable @typescript-eslint/naming-convention */
import { Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { AssignmentType } from '../../../interfaces/AssignmentType';

export default function AssignmentDescription(props:Partial<AssignmentType>) {
  const {
    title, description, max_attempts, passing_score, deadline,
  } = props;
  return (
    <Stack p={2}>
      <Typography fontWeight="bold">{title ?? 'Course:  Cloud Computing Basic Test'}</Typography>
      <Typography paragraph>
        <b>Description : </b>
        {description ?? 'Evaluate the basic knowedge of cloud computing models and providers.'}
      </Typography>
      <Typography fontWeight="bold">
        <Chip label={`Max Score : ${passing_score}`} variant="outlined" />
        <Chip label={`Max Attempts : ${max_attempts}`} variant="outlined" />
        <Chip label={`Due ${moment(deadline).fromNow()}`} variant="outlined" />
      </Typography>
    </Stack>
  );
}
