import * as Yup from 'yup';
import Model from './Model';

class Course extends Model {
  constructor() {
    super();
    this.name = 'courses';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().min(3, 'The Name must be at least 3 characters').required('Please, provide a summary.'),
      thumbnail: Yup.string().min(3),
      summary: Yup.string().min(3, 'The summary must be at least 3 characters').required('Please, provide a summary.'),
      description: Yup.string().min(3),
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
