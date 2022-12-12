import { RemoveRedEyeRounded } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormBuilder from './FormBuilder';

interface FormProps {
  title: React.ReactNode,
  model: any;
  mutation: any;
  dialog: boolean;
}

type Props = Required<FormProps> & {
  cancelBtn?: boolean,
  onCancel?: () => void,
  location?: boolean,
  loading?: boolean,
  useIcon?: React.ReactNode,
};

export default function MixedForm({
  title = 'Add new model',
  model,
  mutation,
  dialog,
  cancelBtn = true,
  location = false,
  loading = false,
  useIcon,
  onCancel,
} : Props): JSX.Element {
  // const model = new Entity();
  const { state } = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);
  // const openForm = () => dispatch(openDialog());
  const handleCancel = () => {
    // dispatch(closeDialog());
    closeForm();
    if (state && location) navigate(state.pathname);
    if (onCancel) {
      onCancel();
    }
  };
  const onSubmit = async (values:FormikValues) => {
    const data = model.beforeSubmit(values) ?? values;
    const res = await mutation(data)?.unwrap();
    toast(res.message);
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
      {dialog && (useIcon ? (
        <IconButton onClick={openForm} sx={{ bgcolor: 'primary.main' }}>
          {useIcon}
        </IconButton>
      ) : (<Button size="large" onClick={openForm}>{title}</Button>))}
      <FormBuilder
        dialog={dialog}
        open={open}
        title={title}
        model={model}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        cancelBtn={cancelBtn}
        loading={loading}
      />
    </Stack>
  );
}
