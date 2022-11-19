import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack,
} from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import Model from '../../models/Model';
import MixedInput from './inputs/MixedInput';

interface FormProps {
  title: string,
  dialog: boolean,
  model: Model,
  onSubmit: (values: FormikValues) => void,
  handleClose: () => void,
  open: boolean,
}

function FormBuilder(props: Required<FormProps>) {
  const {
    onSubmit,
    model,
    open,
    handleClose,
    title,
    dialog,
  } = props;
  const formik = useFormik({
    initialValues: model.initialValues,
    validationSchema: model.validationSchema,
    onSubmit,
  });
  const handleSubmit = () => {
    formik.submitForm();
    formik.resetForm();
  };

  const { errors } = formik;
  const fieldNames = Object.keys(errors);

  const formContent = (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} pt={dialog ? 1.5 : 0}>
            {model.fields.map(
              (field) => (
                <MixedInput
                  {...field}
                  error={fieldNames.includes(field.name)}
                  helperText={fieldNames.includes(field.name) ? errors[field.name] : undefined}
                  onChange={formik.handleChange}
                  key={field.name}
                />
              ),
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
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
