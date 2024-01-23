import * as Yup from 'yup';
import Model, { Field } from './Model';

class Lesson extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'lesson';
    this.validationSchema = Yup.object().shape({
      lesson_title: Yup.string().required().min(3),
      lesson_summary: Yup.string().required().min(3),
      lesson_no: Yup.number().required().min(1),
    });
    this.fields = [
      {
        name: 'lesson_title',
        type: 'text',
        label: 'Lesson Title',
      },
      {
        name: 'lesson_summary',
        label: 'Lesson Summary',
        type: 'textarea',
        multiline: true,
        rows: 4,
      },
      {
        name: 'lesson_no',
        type: 'number',
      },
    ];
    this.init(props);
  }
/*
  beforeSubmit({
    status, title, content, description, author_id, id,
  }: FormikValues): FormikValues {
    return {
      id, title, content, description, author_id, status: this.data.status.indexOf(status) + 1,
    };
  } */
}

export default Lesson;
