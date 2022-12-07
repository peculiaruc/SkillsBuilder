/* eslint-disable class-methods-use-this */
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import Model, { Field } from './Model';

class UserSocialNetwork extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      telegram: Yup.number().nullable(),
      whatsapp: Yup.number().nullable(),
      linkedin: Yup.string().nullable(),
      github: Yup.string().nullable(),
    });
    this.fields = [
      { name: 'telegram', type: 'number', label: 'Your telegram phone' },
      { name: 'whatsapp', type: 'number', label: 'Your whatsapp phone' },
      { name: 'linkedin', type: 'text', label: 'Your linkedin profile link' },
      { name: 'github', type: 'text', label: 'Your github profile link' },
    ];

    this.init(props);
  }

  beforeSubmit({
    telegram, whatsapp, linkedin, github, id,
  }: FormikValues): FormikValues {
    return {
      telegram, whatsapp, linkedin, github, id,
    };
  }
}

export default UserSocialNetwork;
