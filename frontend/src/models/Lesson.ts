/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { FormikValues } from 'formik';
import Model, { Field } from './Model';

class Lesson extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'lesson';
    this.validationSchema = Yup.object().shape({
      lesson_title: Yup.string().required(),
      lesson_summary: Yup.string().required(),
      lesson_content: Yup.string().required(),
      lesson_content_type: Yup.string().required(),
      lesson_no: Yup.string().required(),
    });
    this.fields = [
      {
        name: 'lesson_title',
        type: 'string',
      },
      {
        name: 'lesson_summary',
        type: 'string',
      },
      {
        name: 'lesson_content',
        type: 'string',
      },
      {
        name: 'lesson_content_type',
        type: 'select',
      },
      {
        name: 'lesson_no',
        type: 'number',
      },
    ];
    this.init(props);
  }

  beforeSubmit({ course, ...rest }: FormikValues): FormikValues {
    return { ...rest, course_id: course.id };
  }
}
export default Lesson;
