import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { closeDialog, openDialog } from '../../store/dialogFormReducer';
import FormBuilder from './FormBuilder';

interface Props {
  title: string;
  model: any;
  useMutation: any;
  dialog: boolean;
}

export default function MixedForm({
  title = 'Add new model',
  model,
  useMutation,
  dialog,
} : Required<Props>): JSX.Element {
  // const model = new Entity();
  const dispatch = useDispatch();
  const openForm = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createModel] = useMutation();
  const onSubmit = async (values:FormikValues) => {
    const data = model.beforeSubmit(values) ?? values;
    await createModel(data).unwrap();
    toast(`${model.name} created successfully`);
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
          dialog={dialog}
          title={title}
          model={model}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        {dialog && (<Button size="large" onClick={openForm}>{title}</Button>)}
      </Stack>
    </Paper>
  );
}
