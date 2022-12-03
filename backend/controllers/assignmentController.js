import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Assignment from '../models/assignment';
import AssignmentSubmissions from '../models/assignmentSubmissions';
import AssignmentQuestions from '../models/assignmentQuestions';
import moment from 'moment';

const enrollment = new Enrollment();
const assignment = new Assignment();
const submission = new AssignmentSubmissions();
const assQuestions = new AssignmentQuestions();
const date = moment(new Date()).format('YYYY-MM-DD');

class AssignmentController {
  // static async getCourseAssignments(req, res) {
  //   const { course_id } = req.body;
  //   const ass = await assignment.getByCourse(course_id);
  //   if (ass.errors) return Helpers.dbError(res, ass);
  //   return Helpers.sendResponse(res, 200, 'success', { assignments: ass.rows });
  // }

  // static async getAssignmentSubmissions(req, res) {
  //   const { assignment_id, user_id } = req.body;
  //   const sub = await submission.allWhere({ assignment_id, user_id });
  //   if (sub.errors) return Helpers.dbError(res, sub);
  //   return Helpers.sendResponse(res, 200, 'success', { assignments: sub.rows });
  // }

  // static async createAssignmentSubmissions(req, res) {
  //   const { course_id, user_id, assignment_id, grade, status } = req.body;
  //   const newSubmission = {
  //     course_id,
  //     user_id,
  //     assignment_id,
  //     grade,
  //     status,
  //   };
  //   const _newSubmission = await submission.create(newSubmission);
  //   if (_newSubmission.errors) return Helpers.dbError(res, _newSubmission);
  //   return Helpers.sendResponse(res, 200, 'success', { assignments: _newSubmission.rows });
  // }

  // static async createAssignmentQuestions(req, res) {
  //   const { assignment_id, question, question_no } = req.body;
  //   const newQuestion = {
  //     assignment_id,
  //     question,
  //     choices: JSON.stringify(req.body.choices),
  //     question_no,
  //   };
  //   const saveQs = await assQuestions.create(newQuestion);
  //   if (saveQs.errors) return Helpers.dbError(res, saveQs);

  //   return Helpers.sendResponse(res, 200, 'success creating question', {
  //     question: saveQs.rows[0],
  //   });
  // }

  // static async getUsersInMyCourse(req, res) {
  //   const { course_id } = req.body;
  //   const enrolledUsers = enrollment.where(course_id, course_id);
  //   if (enrolledUsers.errors) return Helpers.dbError(res, enrolledUsers);
  //   return Helpers.sendResponse(res, 200, 'success', { assignments: enrolledUsers.rows });
  // }

  static async createAssignment(req, res) {
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
    return Helpers.sendResponse(res, 200, 'success', { assignments: qs.rows });
  }
}

export default AssignmentController;
