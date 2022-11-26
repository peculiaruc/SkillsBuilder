import * as Yup from 'yup';
import Model from './Model';

class Group extends Model {
  constructor() {
    super();
    this.name = 'groups';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().min(3, 'The Name must be at least 3 characters').required('Please, provide a summary.'),
    });
    this.fields = [
      {
        name: 'name',
        type: 'text',
      },
    ];
    this.setInitialValues();
  }
}

export default Group;
