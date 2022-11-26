import { GroupAddSharp } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { FormikValues } from 'formik';
import { batch, useDispatch } from 'react-redux';
import FormBuilder from '../../../components/forms/FormBuilder';
import { GroupType } from '../../../interfaces/GroupTypes';
import Group from '../../../models/Group';
import { useAuth } from '../../../store/authReducer';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';
import { addGroup, joinGroup } from '../../../store/groupReducer';

export default function CreateGroupItem() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const onCancel = () => dispatch(closeDialog());
  const handleCreateGroup = () => dispatch(openDialog());
  const onSubmit = (group: FormikValues) => {
    const newGroup = { ...group, id: nanoid(), owner: String(auth.user.id) } as GroupType;
    batch(() => {
      dispatch(addGroup(newGroup));
      dispatch(joinGroup(newGroup.id));
      onCancel();
    });
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
