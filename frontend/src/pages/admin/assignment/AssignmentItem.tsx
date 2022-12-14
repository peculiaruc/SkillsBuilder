import styled from '@emotion/styled';
import { DeleteForeverRounded, Edit, RemoveRedEyeRounded } from '@mui/icons-material';
import {
  Grid, IconButton, Paper, Stack, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteAssignmentMutation, useUpdateAssignmentMutation } from '../../../apiServices/assignmentService';
import courseImage from '../../../assets/images/Group.png';
import MixedForm from '../../../components/forms/MixedForm';
import { LoaderButton } from '../../../components/Loader';
import { AssignmentType } from '../../../interfaces/AssignmentType';
import Assignment from '../../../models/Assignments';
import theme from '../../../theme/theme';
import AssignmentDescription from './AssignmentDescription';
import CourseTitle from './CourseTitle';

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
          <Stack spacing={2} alignItems="flex-end">
            <IconButton onClick={viewAssigment} sx={{ bgcolor: 'secondary.main' }}>
              <RemoveRedEyeRounded htmlColor="white" />
            </IconButton>
            <MixedForm
              dialog
              title="Edit"
              mutation={updateAssignment}
              model={new Assignment({ ...assignment })}
              useIcon={<Edit color="success" />}
            />
            {!isLoading
              ? (
                <IconButton sx={{ bgcolor: 'error.main' }} onClick={handleDelete}>
                  <DeleteForeverRounded htmlColor="white" />
                </IconButton>
              )
              : <LoaderButton /> }
          </Stack>
        </Grid>
      </Grid>
    </SlyledPaper>
  );
}

export default AssignmentItem;
