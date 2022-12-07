/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Button, Divider, Stack, Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDeletePostMutation } from '../../../apiServices/postService';
import Loader from '../../../components/Loader';
import { PostType } from '../../../interfaces/PostType';
import { useAuth } from '../../../store/authReducer';

export type Props = {
  feed: PostType
};

export default function GroupFeedItem({ feed }: Props) {
  const { user } = useAuth();
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const {
    title, content, owner_id, id,
  } = feed;

  const handleDeletePost = async () => {
    const res = await deletePost(id).unwrap();
    toast(res.message);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography fontWeight="bold">{title}</Typography>
      <Divider />
      <Typography paragraph>
        {content}
      </Typography>
      <Divider />
      { user.id === owner_id && (
        <>
          { isLoading ? (<Loader />)
            : (
              <Button
                fullWidth={false}
                onClick={handleDeletePost}
              >
                Delete Post
              </Button>
            ) }
        </>
      )}
    </Stack>
  );
}
