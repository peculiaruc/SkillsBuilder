import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack,
} from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import Model from '../../models/Model';
import { useFormState } from '../../store/dialogFormReducer';
import MixedInput from './inputs/MixedInput';

interface FormProps {
  title: string,
  dialog: boolean,
  model: Model,
  onSubmit: (values: FormikValues) => void,
  onCancel: () => void,
}

function FormBuilder({
  onSubmit, model, onCancel, title, dialog,
} : Required<FormProps>) {
  const open = useFormState();
  const formik = useFormik({
    initialValues: model.initialValues,
    validationSchema: model.validationSchema,
    onSubmit,
  });
  const handleSubmit = () => formik.submitForm();

  const { errors } = formik;
  const fieldNames = Object.keys(errors);

  const formContent = (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Stack spacing={2} pt={dialog ? 1.5 : 0}>
            {model.fields.map(
              (field) => (
                <MixedInput
                  {...field}
                  error={fieldNames.includes(field.name)}
                  helperText={fieldNames.includes(field.name) ? errors[field.name] as string : ''}
                  onChange={formik.handleChange}
                  key={field.name}
                />
              ),
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </>
  );

  const DialogForm = (
    <Dialog open={open} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
      {formContent}
    </Dialog>
  );

  const NoDialogForm = (
    <Paper sx={{ borderRadius: 2, width: '100%' }}>
      {formContent}
    </Paper>
  );

  return dialog ? DialogForm : NoDialogForm;
}

export default FormBuilder;
