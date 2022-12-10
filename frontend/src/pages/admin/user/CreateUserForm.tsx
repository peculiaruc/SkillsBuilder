import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { useCreateUserMutation } from '../../../apiServices/userService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CreateUserRequest } from '../../../interfaces/UserType';
import User from '../../../models/User';

type Props = {
  title: string
};

export default function CreateUserForm({ title = 'Add new user' } : Props) {
  const model = new User();
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const onCancel = () => setOpen(false);
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (values:FormikValues) => {
    const user = { ...values, role: model.data.role.indexOf(values.role) } as CreateUserRequest;
    await createUser(user).unwrap();
    onCancel();
  };
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
          title={title}
          dialog
          model={model}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <Button size="large" onClick={openForm}>{title}</Button>
      </Stack>
    </Paper>
  );
}
