import { PostAddSharp } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FormBuilder from '../../../components/forms/FormBuilder';
import Post from '../../../models/Post';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';

export default function CreatePostItem() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { id } = useParams();
  const onCancel = () => dispatch(closeDialog());
  const handleCreatePost = () => dispatch(openDialog());
  const onSubmit = async (post: FormikValues) => {
    const request = { ...post, group_id: id, owner_id: auth.user.id };
    // eslint-disable-next-line no-console
    console.log(request);
  };
  const model = new Post();

  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: 'common.background',
        p: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <FormBuilder
          title="Create a post"
          dialog
          model={model}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <PostAddSharp />
        <Button onClick={handleCreatePost} color="success">
          Create Post
        </Button>
      </Stack>
    </Paper>
  );
}
