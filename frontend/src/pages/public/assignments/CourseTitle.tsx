import { Box, styled } from '@mui/material';

const CourseTitle = styled(Box)(({ theme }) => ({
  'background-color': theme.palette.primary.main,
  height: '100%',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default CourseTitle;
