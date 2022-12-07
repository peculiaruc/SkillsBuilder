/* eslint-disable @typescript-eslint/naming-convention */
import { Chip, Stack, Typography } from '@mui/material';
import { AssignmentType } from '../../../interfaces/AssignmentType';

export default function AssignmentDescription(props:Partial<AssignmentType>) {
  const {
    title, description, max_attemps, passing_score,
  } = props;
  return (
    <Stack p={2}>
      <Typography fontWeight="bold">{title ?? 'Course:  Cloud Computing Basic Test'}</Typography>
      <Typography paragraph>
        <b>Description : </b>
        {description ?? 'Evaluate the basic knowedge of cloud computing models and providers.'}
      </Typography>
      <Typography fontWeight="bold">
        <Chip label={`Max Score : ${passing_score ?? '82'}`} variant="outlined" />
        <Chip label={`Attempts : 2/${max_attemps ?? '5'}`} variant="outlined" />
        <Chip label={`Date : ${new Date().toLocaleString()}`} variant="outlined" />
      </Typography>
    </Stack>
  );
}
