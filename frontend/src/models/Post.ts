import * as Yup from 'yup';
import Model from './Model';

class Post extends Model {
  constructor() {
    super();
    this.name = 'post';
    this.validationSchema = Yup.object().shape({
      title: Yup.string().min(3),
      content: Yup.string().min(3),
    });
    this.fields = [
      {
        name: 'title',
        type: 'text',
        label: 'Post Title',
      },
      {
        name: 'content',
        label: 'Post Content',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
    ];
    this.setInitialValues();
  }
}

export default Post;
