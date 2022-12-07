import { FormikValues } from 'formik';
import * as Yup from 'yup';
import Model, { Field } from './Model';

class User extends Model {
  constructor(props: Field = {}) {
    super({ ...props, role: 'learner' });
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().nullable(),
      city: Yup.string().nullable(),
      country: Yup.string().nullable(),
      telegram: Yup.string().nullable(),
      whatsapp: Yup.string().nullable(),
      linkedin: Yup.string().nullable(),
      github: Yup.string().nullable(),
      password: Yup.string().required(),
      confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'Password not match'),
      role: Yup.string().required(),
    });
    this.fields = [
      { name: 'fullname', type: 'text' },
      { name: 'email', type: 'email' },
      { name: 'role', type: 'select' },
      { name: 'password', type: 'password' },
      { name: 'confirm_password', type: 'password' },
    ];
    this.data = {
      role: ['learner', 'author', 'admin'],
    };
  }

  beforeSubmit(values: FormikValues): FormikValues {
    return { ...values, role: this.data.role.indexOf(values.role) };
  }
}

export default User;
