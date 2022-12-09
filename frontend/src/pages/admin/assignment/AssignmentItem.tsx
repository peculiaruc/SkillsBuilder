import styled from '@emotion/styled';
import {
  Button, Grid, Paper, Typography, Stack,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../../../theme/theme';
import CourseTitle from './CourseTitle';
import courseImage from '../../../assets/images/Group.png';
import AssignmentDescription from './AssignmentDescription';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import { useDeleteAssignmentMutation, useUpdateAssignmentMutation } from '../../../apiServices/assignmentService';
import Assignment from '../../../models/Assignments';
import MixedForm from '../../../components/forms/MixedForm';
import { LoaderButton } from '../../../components/Loader';

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
  const { title, id } = assignment;
  const navigate = useNavigate();
  const location = useLocation();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();
  const viewAssigment = () => navigate(`/admin/assignments/${id}`, { state: location });
  const handleDelete = async () => {
    const res = await deleteAssignment(id).unwrap();
    toast(res.message);
  };

  return (
    <SlyledPaper>
      <Grid container columns={4} sx={{ width: '100%' }}>
        <Grid item xs={4} sm={4} lg={1}>
          <CourseTitle sx={{ backgroundImage: courseImage }}>
            <Typography fontWeight="bold" color="common.white">
              {title}
            </Typography>
          </CourseTitle>
        </Grid>
        <Grid item xs={4} sm={4} lg={2}>
          <AssignmentDescription {...assignment} />
        </Grid>
        <Grid item xs={4} sm={4} lg={1}>
          <Stack spacing={2}>
            <Button onClick={viewAssigment}>View</Button>
            <MixedForm
              dialog
              title="Edit"
              mutation={updateAssignment}
              model={new Assignment({ ...assignment })}
            />
            {!isLoading
              ? <Button color="error" onClick={handleDelete}> Delete </Button>
              : <LoaderButton /> }
          </Stack>
        </Grid>
      </Grid>
    </SlyledPaper>
  );
}

export default AssignmentItem;
