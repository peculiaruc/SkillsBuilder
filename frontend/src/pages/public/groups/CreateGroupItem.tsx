import { GroupAddSharp } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateGroupMutation } from '../../../apiServices/groupService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CreateGroupRequest } from '../../../interfaces/GroupTypes';
import Group from '../../../models/Group';
import { useAuth } from '../../../store/authReducer';

export default function CreateGroupItem() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [createGroup] = useCreateGroupMutation();
  const onCancel = () => setOpen(false);
  const handleCreateGroup = () => setOpen(true);
  const onSubmit = async (group: FormikValues) => {
    const request = { ...group, owner_id: auth.user.id } as CreateGroupRequest;
    await createGroup(request).unwrap();
    onCancel();
    toast('Group created successfully');
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
          height: '100%',
        }}
      >
        <FormBuilder
          open={open}
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
