import { Button, Paper } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useCreateUserMutation } from '../../../apiServices/userService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CreateUserRequest } from '../../../interfaces/UserType';
import User from '../../../models/User';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';

function UserList() {
  const model = new User();
  const dispatch = useDispatch();
  const openForm = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (values:FormikValues) => {
    const user = { ...values, role: model.data.role.indexOf(values.role) } as CreateUserRequest;
    const res = await createUser(user).unwrap();
    console.log(res);
    onCancel();
  };
  return (
    <Paper sx={{
      height: '300px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <FormBuilder
        title="Add a new user"
        dialog
        model={model}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
      <Button size="large" onClick={openForm}>Add course author or learner</Button>
    </Paper>
  );
}

export default UserList;
