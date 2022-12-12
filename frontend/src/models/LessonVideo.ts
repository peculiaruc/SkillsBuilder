import * as Yup from 'yup';
import Model, { Field } from './Model';

class LessonVideo extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'lesson';
    this.validationSchema = Yup.object().shape({
      content: Yup.object().required(),
      content_title: Yup.string().required(),
      content_type: Yup.string().required(),
    });
    this.fields = [
      {
        name: 'content_title',
        type: 'text',
        label: 'Video Caption',
      },
      {
        name: 'content',
        type: 'image',
        label: 'Video Link',
      },
    ];
    this.init({ ...props, content_type: 'video' });
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

export default LessonVideo;
