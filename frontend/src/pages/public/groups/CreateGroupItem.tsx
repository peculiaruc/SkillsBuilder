import { GroupAddSharp } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useCreateGroupMutation } from '../../../apiServices/groupService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CreateGroupRequest } from '../../../interfaces/GroupTypes';
import Group from '../../../models/Group';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';

export default function CreateGroupItem() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [createGroup] = useCreateGroupMutation();
  const onCancel = () => dispatch(closeDialog());
  const handleCreateGroup = () => dispatch(openDialog());
  const onSubmit = async (group: FormikValues) => {
    const request = { ...group, owner_id: auth.user.id } as CreateGroupRequest;
    await createGroup(request).unwrap();
  };
  const model = new Group();

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
          title="Create a group"
          dialog
          model={model}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <GroupAddSharp />
        <Button onClick={handleCreateGroup} color="success">
          Create Group
        </Button>
      </Stack>
    </Paper>
  );
}
