import {
  Box, Button, Grid, Paper, Stack, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUpdateOneCourseMutation } from '../../../apiServices/courseService';
import MixedForm from '../../../components/forms/MixedForm';
import { CourseType } from '../../../interfaces/CourseType';
import Course from '../../../models/Course';
import { useAuth } from '../../../store/authReducer';

type Props = {
  course: CourseType
};

function ListItemCourse({ course }: Props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    title, description, id, author_id,
  } = course;
  const style = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

  const navigate = useNavigate();
  const { user } = useAuth();

  const [updateCourse, { isLoading }] = useUpdateOneCourseMutation();

  const model = new Course({ ...course });
  model.setInitialValues({ status: model.data[course.status - 1] });
  return (
    <Paper sx={{
      width: '100%',
      height: '100%',
      p: 2,
      borderRadius: 2,
      maxHeight: 200,
    }}
    >
      <Grid container columns={[1, 3, 5]} spacing={2}>
        <Grid item xs={1} sm={2} md={2}>
          <Box sx={{
            ...style,
            bgcolor: 'primary.main',
            height: '100%',
            borderRadius: 2,
            p: 3,
            // backgroundImage: `url(${thumbnail})`,
          }}
          >
            <Typography fontWeight="bold" color="common.white">{title}</Typography>
          </Box>

        </Grid>
        <Grid item xs={1} sm={1} md={2} sx={{ ...style, justifyContent: 'flex-start' }}>
          <p>{description.substring(0, 250)}</p>
        </Grid>
        <Grid item xs={1} sm={1} md={1} sx={style}>
          <Stack spacing={2}>
            {user.id === author_id && (
            <MixedForm
              dialog
              title="Edit Course"
              model={model}
              mutation={updateCourse}
              loading={isLoading}
            />
            ) }
            <Button onClick={() => navigate(`/admin/courses/${id}`)}>View Details</Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ListItemCourse;
