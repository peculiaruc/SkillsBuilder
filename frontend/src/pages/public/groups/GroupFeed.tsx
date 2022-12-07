import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetGroupPostsQuery } from '../../../apiServices/groupService';
import MixedForm from '../../../components/forms/MixedForm';
import Loader from '../../../components/Loader';
import { PostType } from '../../../interfaces/PostType';
import Post from '../../../models/Post';
import { useAuth } from '../../../store/authReducer';
import EmptyView from '../../errors/EmptyView';
import CreatePostItem from '../post/CreatePostForm';
import GroupFeedItem from './GroupFeedItem';

export default function GroupFeed() {
  const { user } = useAuth();
  const { id } = useParams();
  
  const [createPost] = useCreate

  const { data, isLoading } = useGetGroupPostsQuery(Number(id));

  if (isLoading) {
    return <Loader />;
  }

  const feeds = data?.data.posts as PostType[];
  if (!feeds) return <EmptyView title="This group has no feeds" code={404} />;

  return (
    <Stack spacing={2} width="100%">
      <MixedForm dialog mutation={} model={new Post({ group_id: id, owner_id: user.id })} />
      {feeds.map((feed) => (<GroupFeedItem feed={feed} key={feed.id} />))}
    </Stack>
  );
}
