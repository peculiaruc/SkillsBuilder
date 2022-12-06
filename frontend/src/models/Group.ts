import * as Yup from 'yup';
import Model from './Model';

class Group extends Model {
  constructor() {
    super();
    this.name = 'group';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required().min(3),
      description: Yup.string(),
    });
    this.fields = [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'description',
        type: 'text',
        rows: 5,
        multiline: true,
      },
    ];
    this.setInitialValues();
  }
}

export default Group;
