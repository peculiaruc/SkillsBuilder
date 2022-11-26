import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Assignment from '../models/assignment';
import AssignmentSubmissions from '../models/assignmentSubmissions';
import AssignmentQuestions from '../models/assignmentQuestions';

const enrollment = new Enrollment();
const assignment = new Assignment();
const submission = new AssignmentSubmissions();
const assQuestions = new AssignmentQuestions();
class AssignmentController {
  static async getCourseAssignments(req, res) {
    const { course_id } = req.body;
    const ass = await assignment.getByCourse(course_id);
    if (ass.errors) return Helpers.dbError(res, ass);
    return Helpers.sendResponse(res, 200, 'success', { assignments: ass.rows });
  }

  static async getAssignmentSubmissions(req, res) {
    const { assignment_id, user_id } = req.body;
    const sub = await submission.allWhere({ assignment_id, user_id });
    if (sub.errors) return Helpers.dbError(res, sub);
    return Helpers.sendResponse(res, 200, 'success', { assignments: sub.rows });
  }

  static async createAssignmentSubmissions(req, res) {
    const { course_id, user_id, assignment_id, grade, status } = req.body;
    const newSubmission = {
      course_id,
      user_id,
      assignment_id,
      grade,
      status,
    };
    const _newSubmission = await submission.create(newSubmission);
    if (_newSubmission.errors) return Helpers.dbError(res, _newSubmission);
    return Helpers.sendResponse(res, 200, 'success', { assignments: _newSubmission.rows });
  }

  static async getAssignmentById(req, res) {
    const { id } = req.params;
    const oneAss = await assignment.getById(id);
    if (oneAss.errors) return Helpers.dbError(res, oneAss);
    return Helpers.sendResponse(res, 200, 'success', { assignments: oneAss.rows });
  }

  static async getAssignmentQuestions(req, res) {
    const { assignment_id } = req.body;
    const qs = await assQuestions.getByAssignment(assignment_id);
    if (qs.error) return Helpers.dbError(res, qs);
    return Helpers.sendResponse(res, 200, 'success', { assignments: qs.rows });
  }

  static async createAssignmentQuestions(req, res) {
    const { assignment_id, question, choices, question_no } = req.body;
    const newQuestion = {
      assignment_id,
      question,
      choices,
      question_no,
    };
    const saveQs = await assQuestions.create(newQuestion);
    if (saveQs.errors) return Helpers.dbError(res, saveQs);

    return Helpers.sendResponse(res, 200, 'success', { question: saveQs.rows[0] });
  }

  static async getUsersInMyCourse(req, res) {
    const { course_id } = req.body;
    const enrolledUsers = enrollment.where(course_id, course_id);
    if (enrolledUsers.errors) return Helpers.dbError(res, enrolledUsers);
    return Helpers.sendResponse(res, 200, 'success', { assignments: enrolledUsers.rows });
  }

  static async createAssignment(req, res) {
    const { course_id, description, deadline, author_id } = req.body;

    const newAss = {
      course_id,
      description,
      deadline,
      author_id,
    };
    const _assignment = await assignment.create(newAss);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    return Helpers.sendResponse(res, 200, 'success', { assignment: _assignment.rows });
  }
}

export default AssignmentController;
