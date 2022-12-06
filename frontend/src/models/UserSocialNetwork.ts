import * as Yup from 'yup';
import Model, { Field } from './Model';

class UserSocialNetwork extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'user';
    this.validationSchema = Yup.object().shape({
      telegram: Yup.number(),
      whatsapp: Yup.number(),
      linkedin: Yup.string(),
      github: Yup.string(),
    });
    this.fields = [
      { name: 'telegram', type: 'number', label: 'Your telegram phone' },
      { name: 'whatsapp', type: 'number', label: 'Your whatsapp phone' },
      { name: 'linkedin', type: 'text', label: 'Your linkedin profile link' },
      { name: 'github', type: 'text', label: 'Your github profile link' },
    ];

    this.init(props);
  }
}

export default UserSocialNetwork;
