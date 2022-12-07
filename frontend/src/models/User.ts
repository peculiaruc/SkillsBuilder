import * as Yup from 'yup';
import Model from './Model';

class User extends Model {
  constructor() {
    super();
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string(),
      city: Yup.string(),
      country: Yup.string(),
      telegram: Yup.string(),
      whatsapp: Yup.string(),
      linkedin: Yup.string(),
      github: Yup.string(),
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
    this.setInitialValues({ role: 'learner' });
    this.data = {
      role: ['learner', 'author', 'admin'],
    };
  }
}

export default User;
