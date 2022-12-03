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
      confirm_password: Yup.string().required().oneOf([Yup.ref('password'), 'Password not match']),
      role: Yup.string().required(),
    });
    this.fields = [
      { name: 'fullname', type: 'string' },
      { name: 'email', type: 'email' },
      { name: 'phone', type: 'phone' },
      { name: 'city', type: 'text' },
      { name: 'country', type: 'text' },
      { name: 'telegram', type: 'text' },
      { name: 'whatsapp', type: 'text' },
      { name: 'linkedin', type: 'text' },
      { name: 'github', type: 'text' },
      { name: 'role', type: 'select' },
      { name: 'password', type: 'password' },
      { name: 'confirm_password', type: 'password' },
    ];
    this.setInitialValues();
    this.data = {
      role: ['Learner', 'Author', 'Admin'],
    };
  }
}

export default User;
