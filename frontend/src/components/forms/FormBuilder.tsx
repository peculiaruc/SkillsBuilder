/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack,
} from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import React from 'react';
import Model from '../../models/Model';
import { useFormState } from '../../store/dialogFormReducer';
import MixedInput from './inputs/MixedInput';

type SelectOptions = Record<string, unknown>;
interface FormProps {
  title: string | React.ReactNode,
  dialog: boolean,
  model: Model,
  onSubmit: (values: FormikValues) => void,
}
function FormBuilder({
  onSubmit, model, title, dialog, data, onCancel, cancelBtn = true,
} : Required<FormProps> & { cancelBtn?: boolean, data?: any, onCancel?: () => void }) {
  const open = useFormState();
  const formik = useFormik({
    initialValues: data ?? model.initialValues,
    validationSchema: model.validationSchema,
    onSubmit,
  });
  const handleSubmit = () => formik.submitForm();

  const { errors, getFieldProps, touched } = formik;

  const fieldNames = Object.keys(errors);
  const options = Object.keys(model.data as SelectOptions);

  const formContent = (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Stack spacing={2} pt={1.5}>
            {model.fields.map(
              (field) => (
                <MixedInput
                  {...field}
                  {...getFieldProps(field.name)}
                  error={touched[field.name] && fieldNames.includes(field.name)}
                  helperText={fieldNames.includes(field.name) && touched[field.name] ? errors[field.name] as string : ''}
                  key={field.name}
                  options={options.includes(field.name) ? model.data[field.name] : undefined}
                />
              ),
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        {cancelBtn && <Button onClick={onCancel}>Cancel</Button>}
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
