import Helpers from '../helpers/helpers';
import Course from '../models/course';
import CourseLesson from '../models/courseLesson';
import Material from '../models/courseMaterial';
import User from '../models/users';
import { NOT_AUTHORISED, SUCCESS } from '../utils/constants';

const lesson = new CourseLesson();
const user = new User();
const material = new Material();
const course = new Course();

class LessonsController {
  static async createCourseLessons(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const checkMembership = await course.getById(req.body.course_id);
    if (checkMembership.errors) return Helpers.dbError(res, checkMembership);

    if (checkMembership.row.author_id !== currentuser.id) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }

    const newLesson = {
      ...req.body,
    };
    const _new = await lesson.create(newLesson);
    if (_new.errors) return Helpers.dbError(res, _new);
    return Helpers.sendResponse(res, 200, SUCCESS, { lesson: _new.rows });
  }

  static async getLessonById(req, res) {
    const _lesson = await lesson.getById(req.params.id);
    if (_lesson.errors) return Helpers.dbError(res, _lesson);
    return Helpers.sendResponse(res, 200, SUCCESS, { lesson: _lesson.row });
  }

  static async updateLesson(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _lesson = await lesson.getById(req.params.id);
    if (_lesson.errors) return Helpers.dbError(res, _lesson);

    const _course = await course.getById(_lesson.row.course_id);
    if (_course.errors) return Helpers.dbError(res, _course);

    if (currentuser.id !== _course.row.author_id) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }
    const newupdate = {
      ...req.body,
    };
    const _update = await lesson.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, SUCCESS, { lesson: _update.rows[0] });
  }

  static async deleteLesson(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    const _lesson = await lesson.getById(req.params.id);
    if (_lesson.errors) return Helpers.dbError(res, _lesson);

    const _course = await course.getById(_lesson.row.course_id);
    if (_course.errors) return Helpers.dbError(res, _course);

    if (currentuser.id !== _course.row.author_id) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }

    const _update = await lesson.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, SUCCESS);
  }
}

export default LessonsController;
