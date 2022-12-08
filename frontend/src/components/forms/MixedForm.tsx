import { Button, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { closeDialog, openDialog } from '../../store/dialogFormReducer';
import FormBuilder from './FormBuilder';

interface FormProps {
  title: string;
  model: any;
  mutation: any;
  dialog: boolean;
}

type Props = Required<FormProps> & { cancelBtn?: boolean, onCancel?: () => void };

export default function MixedForm({
  title = 'Add new model',
  model,
  mutation,
  dialog,
  cancelBtn = true,
  onCancel,
} : Props): JSX.Element {
  // const model = new Entity();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openForm = () => dispatch(openDialog());
  const handleCancel = () => {
    dispatch(closeDialog());
    if (state) navigate(state.pathname);
    if (onCancel) {
      onCancel();
    }
  };
  const onSubmit = async (values:FormikValues) => {
    const data = model.beforeSubmit(values) ?? values;
    await mutation(data);
    toast(`${model.name} created successfully`);
    handleCancel();
  };
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 2,
      }}
    >
      {dialog && (<Button size="large" onClick={openForm}>{title}</Button>)}
      <FormBuilder
        dialog={dialog}
        title={title}
        model={model}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        cancelBtn={state ?? cancelBtn}
      />
    </Stack>
  );
}
