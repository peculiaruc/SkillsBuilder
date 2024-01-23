import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import { useAssignment } from '../../../store/assignmentReducer';

function AssignmentOverView() {
  const { title, description } = useAssignment();
  const style = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

  return (
    <Paper sx={{
      width: '100%',
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
      </Grid>
    </Paper>
  );
}

export default AssignmentOverView;
