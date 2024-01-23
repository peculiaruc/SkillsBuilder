/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-no-useless-fragment */
import { Delete, Edit, Watch } from '@mui/icons-material';
import moment from 'moment';
import {
  Divider, IconButton, Stack, Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeletePostMutation, useUpdatePostMutation } from '../../../apiServices/postService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { PostType } from '../../../interfaces/PostType';
import Post from '../../../models/Post';
import { useAuth } from '../../../store/authReducer';
import { useGetUserByIdQuery } from '../../../apiServices/userService';
import { UserType } from '../../../interfaces/UserType';

export type Props = {
  feed: PostType
};

export default function GroupFeedItem({ feed }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const {
    title, content, owner_id, id, created_at,
  } = feed;
  const handleDeletePost = async () => {
    const res = await deletePost(id).unwrap();
    toast(res.message);
  };
  const { data, isLoading: i } = useGetUserByIdQuery(owner_id);
  if (i) return <Loader />;
  const owner = data?.data.user as UserType;
  if (!owner) return <Divider />;
  const PostContent = (
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
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack alignItems="center" direction="row">
            <Watch />
            {moment(created_at).fromNow()}
            &nbsp;by&nbsp;
            {owner.fullname}
          </Stack>
          <Stack alignItems="center" direction="row">
            <IconButton color="primary" onClick={() => setOpen(true)}>
              <Edit />
            </IconButton>
            { isLoading ? (<Loader />)
              : (
                <IconButton onClick={handleDeletePost} color="error">
                  <Delete />
                </IconButton>
              )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );

  const PostForm = (
    <MixedForm
      title="Update post"
      dialog={false}
      mutation={updatePost}
      model={new Post(feed)}
      onCancel={() => setOpen(false)}
    />
  );
  return (
    <>
      { open ? PostForm : PostContent }
    </>
  );
}
