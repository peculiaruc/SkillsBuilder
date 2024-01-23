import {
  Avatar, Button, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useUpdateGroupAccessRequestMutation } from '../../../apiServices/groupService';
import { useGetUserByIdQuery } from '../../../apiServices/userService';
import Loader from '../../../components/Loader';
import { GroupAccessRequestType } from '../../../interfaces/GroupTypes';

type Props = {
  request: GroupAccessRequestType
};

export default function JoinGroupRequest({ request }: Props) {
  const [updateGroupAccessRequest] = useUpdateGroupAccessRequestMutation();
  const { data, isLoading } = useGetUserByIdQuery(request.user_id);
  if (isLoading) return <Loader />;
  const user = data?.data.user;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!user) return <></>;
  const { fullname, picture, email } = user;
  const handleRequest = async (status: string) => {
    const res = await updateGroupAccessRequest({
      ...request,
      status,
    }).unwrap();
    toast(res.message);
  };
  return (
    <List sx={{
      width: '100%',
      bgcolor: 'background.paper',
      borderRadius: 4,
    }}
    >
      <ListItem>
        <ListItemAvatar sx={{ mr: 2 }}>
          <Avatar
            src={picture}
            sx={{ width: 56, height: 56 }}
          >
            {fullname.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={fullname}
          secondary={email}
        />
        <Button
          onClick={() => handleRequest('accepted')}
          sx={{ mr: 2 }}
          color="success"
        >
          Accept

        </Button>
        <Button
          onClick={() => handleRequest('rejected')}
          color="error"
        >
          Reject

        </Button>
      </ListItem>
    </List>
  );
}
