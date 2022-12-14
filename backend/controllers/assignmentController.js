import Helpers from '../helpers/helpers';
import Assignment from '../models/assignment';
import AssignmentSubmissions from '../models/assignmentSubmissions';
import AssignmentQuestions from '../models/assignmentQuestions';
import { NOT_AUTHORISED, SUCCESS } from '../utils/constants';
import Course from '../models/course';
import TelegramController from './telegramController';

const assignment = new Assignment();
const submission = new AssignmentSubmissions();
const assQuestions = new AssignmentQuestions();
const course = new Course();

class AssignmentController {
  static async createAssignment(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role === 0) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }
    const newAss = {
      ...req.body,
    };
    const _assignment = await assignment.create(newAss);
    await TelegramController.newAssignmentUpdate(_assignment.rows[0]);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    return Helpers.sendResponse(res, 200, 'success', { assignment: _assignment.rows[0] });
  }

  static async getAssignmentById(req, res) {
    const oneAss = await assignment.getById(req.params.id);
    if (oneAss.errors) return Helpers.dbError(res, oneAss);
    return Helpers.sendResponse(res, 200, 'success', { assignments: oneAss.row });
  }

  static async updateAssignment(req, res) {
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

  static async deleteAssignment(req, res) {
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

  static async getAssignmentQuestions(req, res) {
    const qs = await assQuestions.getByAssignment(req.params.id);
    if (qs.error) return Helpers.dbError(res, qs);
    console.log('resp', qs.rows, qs.rows[0].choices, typeof qs.rows[0].choices);
    return Helpers.sendResponse(res, 200, 'success', {
      assignments: qs.rows,
    });
  }

  static async getAssignmentSubmissions(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const sub = await submission.allWhere({
      assignment_id: req.params.id,
      user_id: currentuser.id,
    });
    if (sub.errors) return Helpers.dbError(res, sub);
    return Helpers.sendResponse(res, 200, 'success', { submissions: sub.rows });
  }

  static async getAuthorAssignmentSubmissions(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _course = await course.getById(req.body.course_id);
    if (_course.errors) return Helpers.dbError(res, _course);
    if (_course.row.id !== currentuser.id) return Helpers.sendResponse(res, 400, NOT_AUTHORISED);

    const sub = await submission.allWhere({
      assignment_id: req.params.id,
      course_id: req.body.course_id,
    });
    if (sub.errors) return Helpers.dbError(res, sub);
    return Helpers.sendResponse(res, 200, 'success', { submissions: sub.rows });
  }
}

export default AssignmentController;
