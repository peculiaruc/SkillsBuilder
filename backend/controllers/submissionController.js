import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Assignment from '../models/assignment';
import AssignmentSubmissions from '../models/assignmentSubmissions';

const assignment = new Assignment();
const submission = new AssignmentSubmissions();
const enrollment = new Enrollment();

class SubmissionController {
  static async createSubmission(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _enrollments = await enrollment.allWhere({
      user_id: currentuser.id,
      course_id: req.body.course_id,
    });
    if (_enrollments.errors) return Helpers.dbError(res, _enrollments);
    const _assignment = await assignment.getById(req.body.assignment_id);
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    const _submissions = await submission.allWhere({
      user_id: req.body.user_id,
      assignment_id: req.body.assignment_id,
    });
    if (_submissions.errors) return Helpers.dbError(res, _submissions);

    if (_enrollments.count === 0 || _enrollments.rows[0].unenroll_date !== null) {
      return Helpers.sendResponse(res, 401, 'You are not enrolled in this course');
    }
    if (_submissions.count >= _assignment.row.max_attempts) {
      return Helpers.sendResponse(res, 401, 'You have reached the maximum number of attempts');
    }

    const newSubmission = {
      ...req.body,
      answers: JSON.stringify(req.body.answers),
    };
    const _newSubmission = await submission.create(newSubmission);
    if (_newSubmission.errors) return Helpers.dbError(res, _newSubmission);
    return Helpers.sendResponse(res, 200, 'success', { submission: _newSubmission.rows });
  }

  static async getSubmissionById(req, res) {
    const _submission = await submission.getById(req.params.id);
    if (_submission.errors) return Helpers.dbError(res, _submission);
    return Helpers.sendResponse(res, 200, 'success', { assignments: _submission.row });
  }
}

export default SubmissionController;
