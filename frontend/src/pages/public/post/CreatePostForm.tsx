import { PostAddSharp } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormBuilder from '../../../components/forms/FormBuilder';
import Post from '../../../models/Post';
import { useAuth } from '../../../store/authReducer';

export default function CreatePostItem() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const onCancel = () => setOpen(false);
  const handleCreatePost = () => setOpen(true);
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
          open={open}
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
