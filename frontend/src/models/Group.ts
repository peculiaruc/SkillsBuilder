import * as Yup from 'yup';
import Model, { Field } from './Model';

class Group extends Model {
  constructor(props: Field = {}) {
    super(props);
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
      {
        name: 'type',
        type: 'select',
      },
      {
        name: 'status',
        type: 'select',
      },
    ];
    this.init(props);
    this.data = {
      type: ['private', 'public'],
      status: ['active', 'inactive'],
    };
  }
}

export default Group;
