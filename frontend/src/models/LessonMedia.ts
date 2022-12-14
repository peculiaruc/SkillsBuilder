import * as Yup from 'yup';
import Model, { Field } from './Model';

class LessonMedia extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'lesson';
    this.validationSchema = Yup.object().shape({
      content_position: Yup.number().required(),
    });
    this.fields = [
      {
        name: 'content_position',
        type: 'number',
        label: 'Content Position',
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

export default LessonMedia;
