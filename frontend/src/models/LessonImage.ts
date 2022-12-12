import * as Yup from 'yup';
import Model, { Field } from './Model';

class LessonImage extends Model {
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
        label: 'Image Caption',
      },
      {
        name: 'content',
        type: 'image',
        label: 'Image Link',
      },
    ];
    this.init({ ...props, content_type: 'image' });
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

export default LessonImage;
