import sendEmail from '../utils/sendEmails';
import Course from '../models/course';
import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Categories from '../models/categories';
import User from '../models/users';
import Assignment from '../models/assignment';
import AssignmentSubmissions from '../models/assignmentSubmissions';
import AssignmentQuestions from '../models/assignmentQuestions';

const course = new Course();
const enrollment = new Enrollment();
const cat = new Categories();
const user = new User();
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
    if (_newSubmission.errors) return Helpers.dbError(res, sub);
    return Helpers.sendResponse(res, 200, 'success', { assignments: _newSubmission.rows });
  }
  static async getAssignmentById(req, res) {
    const { assignment_id } = req.body;
    const oneAss = await assignment.getById(assignment_id);
    if (oneAss.error) return Helpers.dbError(res, oneAss);
    return Helpers.sendResponse(res, 200, 'success', { assignments: oneAss.rows });
  }

  static async getAssignmentQuestions(req, res) {
    const { assignment_id } = req.body;
    const qs = await assQuestions.where(assignment_id, assignment_id, question_no);
    if (qs.error) return Helpers.dbError(res, qs);
    return Helpers.sendResponse(res, 200, 'success', { assignments: qs.rows });
  }
  static async createAssignmentQuestions(req, res) {
    const { questions } = req.body;
    await questions.map(async (q) => {
      const { assignment_id, question, choices, answer, question_no } = q;
      const newQuestion = {
        assignment_id,
        question,
        choices,
        answer,
        question_no,
      };
      const saveQs = await assQuestions.create(newQuestion);
      if (saveQs.errors) return Helpers.dbError(res, saveQs);
    });
    return Helpers.sendResponse(res, 200, 'success', {});
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
