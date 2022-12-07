import * as Yup from 'yup';
import Model, { Field } from './Model';

class Post extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'post';
    this.validationSchema = Yup.object().shape({
      title: Yup.string().required().min(3),
      content: Yup.string().required().min(3),
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
    this.init(props);
  }
}

export default Post;
