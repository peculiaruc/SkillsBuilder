import * as Yup from 'yup';
import Model, { Field } from './Model';

class Course extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'course';
    this.validationSchema = Yup.object().shape({
      title: Yup.string().min(3),
      description: Yup.string().min(3),
      content: Yup.string().min(3),
    });
    this.fields = [
      {
        name: 'title',
        type: 'text',
        label: 'Course Title',
      },
      {
        name: 'description',
        label: 'Course Description',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
      {
        name: 'content',
        label: 'Course Content',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
    ];
    this.init(props);
  }
}

export default Course;
