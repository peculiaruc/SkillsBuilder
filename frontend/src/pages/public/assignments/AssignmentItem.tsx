import styled from '@emotion/styled';
import {
  Button, Grid, Paper, Typography, Dialog, DialogContent,
} from '@mui/material';
import { useState } from 'react';
import theme from '../../../theme/theme';
import CourseTitle from './CourseTitle';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import AssignmentDescription from '../../admin/assignment/AssignmentDescription';
import TakeAssignment from './TakeAssignment';

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

type Props = {
  assignment: AssignmentType
};

function AssignmentItem({ assignment } : Props) {
  const { title } = assignment;
  const [open, setOpen] = useState<boolean>(false);
  const startAssignment = () => setOpen(true);
  const closeAssigment = () => setOpen(false);
  return (
    <SlyledPaper>
      {open && (
        <Dialog fullScreen open={open}>
          <DialogContent sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <TakeAssignment assignment={assignment} onClose={closeAssigment} />
          </DialogContent>
        </Dialog>
      )}
      <Grid container columns={4} sx={{ width: '100%' }}>
        <Grid item xs={4} sm={4} lg={1}>
          <CourseTitle>
            <Typography fontWeight="bold" color="common.white">
              {title}
            </Typography>
          </CourseTitle>
        </Grid>
        <Grid item xs={4} sm={4} lg={2}>
          <AssignmentDescription {...assignment} />
        </Grid>
        <Grid item xs={4} sm={4} lg={1}>
          <Button onClick={startAssignment}>
            Take Assignment
          </Button>
        </Grid>
      </Grid>
    </SlyledPaper>
  );
}

export default AssignmentItem;
