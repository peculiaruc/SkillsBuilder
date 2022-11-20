import styled from '@emotion/styled';
import { Button, Grid, Paper, Typography } from '@mui/material';
import theme from '../../../theme/theme';
import CourseTitle from './CourseTitle';
import courseImage from '../../../assets/images/Group.png';
import AssignmentDescription from './AssignmentDescription';
import { Stack } from '@mui/system';

const SlyledPaper = styled(Paper)({
  width: '100%',
  height: '100%',
  padding: '16px',
  borderRadius: '16px',
  maxHeight: 300,
  [theme.breakpoints.down('md')]: {
    maxHeight: 400,
  },
});

function AssignmentItem() {
  return (
    <SlyledPaper>
      <Grid container columns={4} sx={{ width: '100%' }}>
        <Grid item xs={4} sm={4} lg={1}>
          <CourseTitle sx={{ backgroundImage: courseImage }}>
            <Typography fontWeight="bold" color="common.white">Course:  Cloud Computing Basic Test</Typography>
          </CourseTitle>
        </Grid>
        <Grid item xs={4} sm={4} lg={2}>
          <AssignmentDescription />
        </Grid>
        <Grid item xs={4} sm={4} lg={1}>
          <Stack spacing={2}>
            <Button>View Details</Button>
            <Button>Retake exam</Button>
            <Button color="error">Exam Failed</Button>
          </Stack>
        </Grid>
      </Grid>
    </SlyledPaper>
  );
}

export default AssignmentItem;
