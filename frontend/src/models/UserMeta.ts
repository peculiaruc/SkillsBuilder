import * as Yup from 'yup';
import Model, { Field } from './Model';

class UserMeta extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string(),
      city: Yup.string(),
      country: Yup.string(),
    });
    this.fields = [
      { name: 'fullname', type: 'text' },
      { name: 'email', type: 'email', disabled: true },
      { name: 'phone', type: 'tel' },
      { name: 'city', type: 'text' },
      { name: 'country', type: 'text' },
    ];

    this.init(props);
  }
}

export default UserMeta;
