import { Stack } from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import Model from '../models/Model';
import MixedInput from './inputs/MixedInput';

interface FormProps {
  model: Model,
  onSubmit: (values: FormikValues) => void,
  onClose: () => void,
  onOpen: () => void,
}

function FormBuilder(props: FormProps) {
  const { onSubmit, model } = props;
  const formik = useFormik({
    initialValues: model.initialValues,
    validationSchema: model.validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        {model.fields.map(
          (field) => (
            <MixedInput
              {...field}
              onChange={formik.handleChange}
              key={field.name}
            />
          ),
        )}
      </Stack>
    </form>
  );
}

export default FormBuilder;
