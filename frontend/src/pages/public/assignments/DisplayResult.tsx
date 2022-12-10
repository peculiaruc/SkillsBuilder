import {
  Button, Paper, Stack, Typography,
} from '@mui/material';
import { SubmissionType } from '../../../interfaces/AssignmentType';

type Props = {
  submission: SubmissionType,
  onClose: () => void
};
export default function DisplayResult({ submission, onClose } : Props) {
  const { status, grade } = submission;
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{
        bgcolor: status === 'Passed' ? 'success.main' : 'error.main',
        width: 200,
        height: 200,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Typography
          color="common.white"
          fontWeight="bold"
          variant="h1"
        >
          {grade}

        </Typography>
      </Paper>
      <Typography fontWeight="bold" variant="h5">{status}</Typography>
      {status === 'Passed' && (
        <Typography fontWeight="bold" variant="h4">Congratulation!</Typography>
      )}
      <Button onClick={onClose}>Continue</Button>
    </Stack>
  );
}
