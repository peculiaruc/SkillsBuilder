import * as Yup from 'yup';
import Model from './Model';

class Assignment extends Model {
  constructor() {
    super();
    this.name = 'assignments';
    this.validationSchema = Yup.object().shape({
      course_id: Yup.string().min(3),
      passing_score: Yup.number().required(),
      max_attemps: Yup.number().min(1).required(),
      deadline: Yup.date().required(),
      description: Yup.string().min(3),
    });
    this.fields = [
      {
        name: 'title',
        type: 'text',
        required: true,
      }, {
        name: 'description',
        type: 'text',
        multiline: true,
        rows: 4,
        required: true,
      },
      {
        name: 'passing_score',
        type: 'number',
      },
      {
        name: 'max_attemps',
        type: 'number',
      },
      {
        name: 'deadline',
        type: 'date',
      },
    ];
    this.setInitialValues();
  }
}

export default Assignment;
