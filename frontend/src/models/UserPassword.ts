import * as Yup from 'yup';
import Model, { Field } from './Model';

class UserPassword extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      password: Yup.string().required(),
      confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'Password not match'),
    });
    this.fields = [
      { name: 'password', type: 'password', label: 'New Password' },
      { name: 'confirm_password', type: 'password' },
    ];
    this.init(props);
  }
}

export default UserPassword;
