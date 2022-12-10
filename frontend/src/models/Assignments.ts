/* eslint-disable class-methods-use-this */
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import Model, { Field } from './Model';

class Assignment extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'assignments';
    this.validationSchema = Yup.object().shape({
      passing_score: Yup.number().required(),
      max_attempts: Yup.number().min(1).required(),
      deadline: Yup.date().required(),
      description: Yup.string().min(3),
    });
    this.fields = [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        multiline: true,
        rows: 4,
        required: true,
      },
      {
        name: 'course',
        type: 'select',
        required: true,
      },
      {
        name: 'passing_score',
        type: 'number',
      },
      {
        name: 'max_attempts',
        type: 'number',
      },
      {
        name: 'deadline',
        type: 'date',
      },
    ];
    this.init(props);
  }

  beforeSubmit({ course, ...rest }: FormikValues): FormikValues {
    return { ...rest, course_id: course.id };
  }
}

export default Assignment;
