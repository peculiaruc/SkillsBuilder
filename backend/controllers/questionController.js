import Helpers from '../helpers/helpers';
import Assignment from '../models/assignment';
import AssignmentQuestions from '../models/assignmentQuestions';

const assignment = new Assignment();
const question = new AssignmentQuestions();

class QuestionController {
  static async createQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role === 0) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const newAss = {
      ...req.body,
      choices: JSON.stringify(req.body.choices),
    };
    const _question = await question.create(newAss);
    if (_question.errors) return Helpers.dbError(res, _question);
    return Helpers.sendResponse(res, 200, 'success', { questions: _question.rows });
  }

  static async getQuestionById(req, res) {
    const _question = await question.getById(req.params.id);
    if (_question.errors) return Helpers.dbError(res, _question);
    return Helpers.sendResponse(res, 200, 'success', { question: _question.row });
  }

  static async updateQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _question = await question.getById(req.params.id);
    if (_question.errors) return Helpers.dbError(res, _question);
    const _assignment = await assignment.getById(_question.row.assignment_id);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    if (currentuser.id !== _assignment.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const newupdate = {
      ...req.body,
    };
    const _update = await question.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'success', { question: _update.rows[0] });
  }

  static async deleteQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _question = await question.getById(req.params.id);
    if (_question.errors) return Helpers.dbError(res, _question);
    const _assignment = await assignment.getById(_question.row.assignment_id);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    if (currentuser.id !== _assignment.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }

    const _update = await question.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'successfully deleted');
  }
}

export default QuestionController;
