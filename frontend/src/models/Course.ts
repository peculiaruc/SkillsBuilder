import * as Yup from 'yup';
import Model from './Model';

class Course extends Model {
  constructor() {
    super();
    this.name = 'courses';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().min(3).required('The name field is required'),
      thumbnail: Yup.string().min(3),
      summary: Yup.string().min(3).required('The summary field is required'),
      description: Yup.string().min(3).required('The summary field is required'),
    });
    this.fields = [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'thumbnail',
        type: 'text',
      },
      {
        name: 'summary',
        type: 'text',
      },
      {
        name: 'description',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
    ];
    this.setInitialValues();
  }
}

export default Course;
