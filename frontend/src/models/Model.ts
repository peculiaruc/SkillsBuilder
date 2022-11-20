import { TextFieldProps } from '@mui/material';

type Field = Record<string, unknown>;

type RequiredField = Required<{
  name: string,
  type: string,
}>;

const FieldType: Field = {
  text: '',
  textarea: '',
  email: '',
  url: '',
  tel: '',
  file: {},
  password: '',
  number: 0,
  switch: [],
  checkbox: [],
  select: [],
  date: new Date(),
};

type FieldProps = RequiredField & TextFieldProps;

class Model {
  name!: string;

  validationSchema!: unknown;

  fields!: FieldProps[];

  initialValues!: Field;

  setInitialValues() {
    const values:Field = {};
    this.fields.forEach((field: FieldProps) => {
      values[field.name] = FieldType[field.type || 'text'];
      // eslint-disable-next-line no-param-reassign
      field.label = field.name.charAt(0).toUpperCase().concat(field.name.slice(1));
    });
    this.initialValues = values;
  }
}

export default Model;
