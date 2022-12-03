import Helpers from '../helpers/helpers';
import Assignment from '../models/assignment';

const assignment = new Assignment();

class QuestionController {
  static async createQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role === 0)
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');

    const newAss = {
      ...req.body,
    };
    const _assignment = await assignment.create(newAss);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    return Helpers.sendResponse(res, 200, 'success', { assignment: _assignment.rows });
  }

  static async getQuestionById(req, res) {
    const oneAss = await assignment.getById(req.params.id);
    if (oneAss.errors) return Helpers.dbError(res, oneAss);
    return Helpers.sendResponse(res, 200, 'success', { assignments: oneAss.row });
  }

  static async updateQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _assignment = await assignment.getById(req.params.id);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    if (currentuser.id !== _assignment.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const newupdate = {
      ...req.body,
    };
    const _update = await assignment.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'success', { assignment: _update.rows[0] });
  }

  static async deleteQuestion(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _assignment = await assignment.getById(req.params.id);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    if (currentuser.id !== _assignment.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }

    const _update = await assignment.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'success', { assignment: _update.rows[0] });
  }
}

export default QuestionController;
