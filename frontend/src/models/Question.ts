import * as Yup from 'yup';
import Model, { Field } from './Model';

class Question extends Model {
  constructor(props: Field = {}) {
    super(props);
    this.name = 'questions';
    this.validationSchema = Yup.object().shape({
      question: Yup.string().min(3, 'The Name must be at least 3 characters').required(),
      mark: Yup.number().min(1),
      choices: Yup.array().of(Yup.object({
        isAnswer: Yup.boolean().required(),
        name: Yup.string().required(),
      })),
    });
    this.fields = [
      {
        name: 'question',
        type: 'text',
      },
      {
        name: 'mark',
        type: 'number',
      },
      {
        name: 'choices',
        type: 'question_choices',
      },
    ];
    this.init(props);
  }
}

export default Question;
