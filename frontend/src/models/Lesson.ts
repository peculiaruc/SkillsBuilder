import * as Yup from 'yup';
import Model, { Field } from './Model';

class Lesson extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'lesson';
    this.validationSchema = Yup.object().shape({
      lesson_title: Yup.string().required().min(3),
      lesson_summary: Yup.string().required().min(3),
      lesson_content: Yup.string().required().min(3),
      lesson_content_type: Yup.string().required().min(3),
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
        name: 'lesson_content',
        label: 'Lesson Content',
        type: 'textarea',
        multiline: true,
        rows: 4,
      },
      {
        name: 'lesson_no',
        type: 'number',
      },
      {
        name: 'lesson_content_type',
        type: 'select',
      },
    ];
    this.init(props);
    this.data = {
      lesson_content_type: ['image', 'video', 'text'],
    };
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
