import sendEmail from '../utils/sendEmails';
import Course from '../models/course';
import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Categories from '../models/categories';
import User from '../models/users';
import CourseLesson from '../models/courseLesson';
import moment from 'moment';
import Database from '../db/db';
import Assignment from '../models/assignment';
import CourseStatus from '../models/courseStatus';

const course = new Course();
const enrollment = new Enrollment();
const cat = new Categories();
const user = new User();
const materials = new CourseLesson();
const db = new Database();
const assignment = new Assignment();
const status = new CourseStatus();

class CourseController {
  static async getAllCourses(req, res) {
    const { offset, limit } = req.query;
    const _courses = await course.all(limit || 5, offset || 0, 'id DESC', { status: 2 });
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, 'success', { courses: _courses.rows });
  }

  static async getCoursesByCategories(req, res) {
    const { categories } = req.body;
    const _courses = await course.getByCategory(categories);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, 'success', {
      totalCourses: _courses.count,
      courses: _courses.rows,
    });
  }

  static async getCoursesById(req, res) {
    const { id } = req.params;
    const _courses = await course.getById(id);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, 'success', {
      course: _courses.row,
    });
  }

  static async getEnrolledCourses(req, res) {
    const { id } = req.params;
    const _courses = await enrollment.getByUser(id);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, 'success', {
      course: _courses.rows,
      totalCourses: _courses.count,
    });
  }

  static async getCourseCategories(req, res) {
    const _categories = await cat.all();
    if (_categories.errors) return Helpers.dbError(res, _categories);
    return Helpers.sendResponse(res, 200, 'success', {
      categories: _categories.rows,
    });
  }

  static async enrollUser(req, res) {
    const checkEnrollment = await enrollment.queryBuilder(
      `SELECT * FROM enrollments WHERE user_id = ${req.body.userId} AND course_id = ${req.params.id} AND unenroll_date IS NULL;`
    );

    if (checkEnrollment.errors) return Helpers.dbError(res, checkEnrollment);

    if (checkEnrollment.count > 0)
      return Helpers.sendResponse(res, 400, 'User already enrolled in course');

    const _user = await user.getById(req.body.userId);
    if (_user.errors) return Helpers.dbError(res, _user);

    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);

    const date = moment(new Date()).format('YYYY-MM-DD');

    const newEnroll = {
      user_id: req.body.userId,
      course_id: req.params.id,
      enroll_date: date,
    };
    const _enroll = await enrollment.create(newEnroll);
    if (_enroll.errors) return Helpers.dbError(res, _enroll);

    await sendEmail(
      _user.row.email,
      'Enrollment Confirmation',
      `You have successfully enrolled in ${_course.row.title}`
    );
    return Helpers.sendResponse(res, 200, 'successfully enrolled');
  }

  static async unEnrollUser(req, res) {
    const _user = await user.getById(req.body.userId);
    if (_user.errors) return Helpers.dbError(res, _user);

    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);

    const date = moment(new Date()).format('YYYY-MM-DD');

    const where = {
      user_id: req.body.userId,
      course_id: req.params.id,
    };
    const data = {
      unenroll_date: date,
    };
    const _enroll = await enrollment.update(data, where);
    if (_enroll.errors) return Helpers.dbError(res, _enroll);
    await sendEmail(
      _user.row.email,
      'Unenrollment Confirmation',
      `You have successfully unenrolled in ${_course.row.title}`
    );
    return Helpers.sendResponse(res, 200, 'successfully unenrolled');
  }

  static async courseLearners(req, res) {
    // `SELECT * FROM enrollments JOIN users ON users.id = enrollments.user_id  WHERE course_id = ${req.params.id};`
    const _learners = await db.queryBuilder(
      `SELECT users.fullname, users.email, users.phone, users.city, enrollments.enroll_date, enrollments.unenroll_date FROM users JOIN enrollments ON enrollments.user_id = users.id WHERE enrollments.course_id = ${req.params.id};`
    );
    if (_learners.errors) return Helpers.dbError(res, _learners);
    return Helpers.sendResponse(res, 200, 'success', { learners: _learners.rows });
  }

  static async getCourseAssignments(req, res) {
    const _assignment = await assignment.allWhere({ course_id: req.params.id });
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    return Helpers.sendResponse(res, 200, 'success', { assignments: _assignment.rows });
  }

  static async getCourseLessons(req, res) {
    const _materials = await materials.allWhere({ course_id: req.params.id });
    if (_materials.errors) return Helpers.dbError(res, _materials);
    return Helpers.sendResponse(res, 200, 'success', { materials: _materials.rows });
  }

  static async getCourseAuthor(req, res) {
    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);
    const _user = await user.getById(_course.row.author_id);
    if (_user.errors) return Helpers.dbError(res, _user);
    return Helpers.sendResponse(res, 200, 'success', { author: _user.row });
  }

  static async updateCourse(req, res) {
    const _course = await course.update({ ...req.body }, { id: req.params.id });
    if (_course.errors) return Helpers.dbError(res, _course);
    return Helpers.sendResponse(res, 200, 'success', { course: _course.rows[0] });
  }

  static async createCourse(req, res) {
    const newCourse = {
      ...req.body,
    };
    const _course = await course.create(newCourse);
    if (_course.errors) {
      return Helpers.dbError(res, _course);
    }
    return Helpers.sendResponse(res, 200, 'Course created successfully', {
      course: _course.rows[0],
    });
  }

  static async deleteCourse(req, res) {
    const _del = await course.delete({ id: req.params.id });
    if (_del.errors) {
      return Helpers.dbError(res, _del);
    }
    return Helpers.sendResponse(res, 200, 'Course deleted successfully');
  }

  static async courseStatus(req, res) {
    const _status = await status.getAll();
    console.log(_status);
    if (_status.errors) {
      return Helpers.dbError(res, _status);
    }
    return Helpers.sendResponse(res, 200, 'success', { status: _status.rows });
  }
}

export default CourseController;
