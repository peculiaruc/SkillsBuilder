import * as Yup from 'yup';
import Model from './Model';

class Material extends Model {
  constructor() {
    super();
    this.name = 'material';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      type: Yup.string().required(),
      path: Yup.string().required(),
    });
    this.fields = [
      {
        name: 'course_id',
        type: 'select',
      },
      {
        name: 'path',
        type: 'file',
      },
      {
        name: 'name',
        type: 'hidden',
      },
      {
        name: 'type',
        type: 'hidden',
      },
    ];
  }
}
export default Material;
