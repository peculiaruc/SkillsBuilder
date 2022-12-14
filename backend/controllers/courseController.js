import moment from 'moment';

import sendEmail from '../utils/sendEmails';
import Course from '../models/course';
import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Categories from '../models/categories';
import User from '../models/users';
import CourseLesson from '../models/courseLesson';

import Database from '../db/db';
import Assignment from '../models/assignment';
import CourseStatus from '../models/courseStatus';
import Material from '../models/courseMaterial';
import { ALREADY_ENROLLED, NOT_AUTHORISED, SUCCESS } from '../utils/constants';
import {
  sendMessage,
  getEnrollmentTemplatedMessage,
  getAssignmentTemplatedMessage,
} from '../helpers/whatsappMessagehelper';
import CourseProgress from '../models/courseProgress';
import TelegramController from './telegramController';
import { newCourseUpdate } from '../services/telegramBot';

const course = new Course();
const enrollment = new Enrollment();
const cat = new Categories();
const user = new User();
const lesson = new CourseLesson();
const db = new Database();
const assignment = new Assignment();
const status = new CourseStatus();
const material = new Material();
const progress = new CourseProgress();

class CourseController {
  static async getAllCourses(req, res) {
    const _courses = await course.allWhere({ status: 2 });
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, SUCCESS, { courses: _courses.rows });
  }

  static async getCoursesByCategories(req, res) {
    const { categories } = req.body;
    const _courses = await course.getByCategory(categories);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, SUCCESS, {
      totalCourses: _courses.count,
      courses: _courses.rows,
    });
  }

  static async getCoursesById(req, res) {
    const { id } = req.params;
    const _courses = await course.getById(id);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, SUCCESS, {
      course: _courses.row,
    });
  }

  static async getEnrolledCourses(req, res) {
    const { id } = req.params;
    const _courses = await enrollment.getByUser(id);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, SUCCESS, {
      course: _courses.rows,
      totalCourses: _courses.count,
    });
  }

  static async getCourseCategories(req, res) {
    const _categories = await cat.all();
    if (_categories.errors) return Helpers.dbError(res, _categories);
    return Helpers.sendResponse(res, 200, SUCCESS, {
      categories: _categories.rows,
    });
  }

  static async enrollUser(req, res) {
    const sql = `SELECT * FROM enrollments WHERE user_id = ${req.body.userId} AND course_id = ${req.params.id} AND unenroll_date IS NULL;`;
    const checkEnrollment = await enrollment.queryBuilder(sql);
    if (checkEnrollment.errors) return Helpers.dbError(res, checkEnrollment);
    if (checkEnrollment.count > 0) return Helpers.sendResponse(res, 400, ALREADY_ENROLLED);

    const _user = await user.getById(req.body.userId);
    if (_user.errors) return Helpers.dbError(res, _user);

    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);

    const date = moment(new Date()).format('YYYY-MM-DD');
    console.log(_course.row);
    const newEnroll = {
      user_id: req.body.userId,
      course_id: req.params.id,
      author_id: _course.row.author_id,
      enroll_date: date,
    };
    const _enroll = await enrollment.create(newEnroll);
    if (_enroll.errors) return Helpers.dbError(res, _enroll);

    await sendEmail(
      _user.row.email,
      'Enrollment Confirmation',
      `You have successfully enrolled in ${_course.row.title}`,
    );
    // if (_user.row.whatsapp) {
    //   const _author = await user.getById(_course.row.author_id);
    //   if (_author.errors) return Helpers.dbError(res, _author);

    //   const data = getEnrollmentTemplatedMessage(_user.row.whatsapp, _course.row, _author.row);

    //   await sendMessage(data, res);
    // }

    return Helpers.sendResponse(res, 200, SUCCESS);
  }

  static async unEnrollUser(req, res) {
    const _user = await user.getById(req.body.userId);
    if (_user.errors) return Helpers.dbError(res, _user); // if (_user.row.whatsapp) {
    //   const _author = await user.getById(_course.row.author_id);
    //   if (_author.errors) return Helpers.dbError(res, _author);

    //   const data = getEnrollmentTemplatedMessage(_user.row.whatsapp, _course.row, _author.row);

    //   await sendMessage(data, res);
    // }

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
      `You have successfully unenrolled in ${_course.row.title}`,
    );
    return Helpers.sendResponse(res, 200, SUCCESS);
  }

  static async courseLearners(req, res) {
    const sql = `SELECT users.fullname, users.email, users.phone, users.city, enrollments.enroll_date, enrollments.unenroll_date FROM users JOIN enrollments ON enrollments.user_id = users.id WHERE enrollments.course_id = ${req.params.id};`;
    const _learners = await db.queryBuilder(sql);
    if (_learners.errors) return Helpers.dbError(res, _learners);
    return Helpers.sendResponse(res, 200, SUCCESS, { learners: _learners.rows });
  }

  static async getCourseAssignments(req, res) {
    const _assignment = await assignment.allWhere({ course_id: req.params.id });
    if (_assignment.errors) return Helpers.dbError(res, _assignment);
    return Helpers.sendResponse(res, 200, SUCCESS, { assignments: _assignment.rows });
  }

  static async getCourseMaterials(req, res) {
    const _material = await material.allWhere({ course_id: req.params.id });
    if (_material.errors) return Helpers.dbError(res, _material);
    return Helpers.sendResponse(res, 200, SUCCESS, { materials: _material.rows });
  }

  static async getCourseLessons(req, res) {
    const _lessons = await lesson.allWhere({ course_id: req.params.id });
    if (_lessons.errors) return Helpers.dbError(res, _lessons);
    console.log(_lessons);
    return Helpers.sendResponse(res, 200, SUCCESS, { lessons: _lessons.rows });
  }

  static async getCourseAuthor(req, res) {
    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);
    const _user = await user.getById(_course.row.author_id);
    if (_user.errors) return Helpers.dbError(res, _user);
    return Helpers.sendResponse(res, 200, SUCCESS, { author: _user.row });
  }

  static async updateCourse(req, res) {
    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);

    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role === 2 || _course.row.author_id === currentuser.id) {
      const _update = await course.update({ ...req.body }, { id: req.params.id });
      if (_update.errors) return Helpers.dbError(res, _update);
      return Helpers.sendResponse(res, 200, SUCCESS, { course: _update.rows[0] });
    }
    return Helpers.sendResponse(res, 404, NOT_AUTHORISED);
  }

  static async createCourse(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    if (currentuser.role === 0) {
      return Helpers.sendResponse(res, 404, NOT_AUTHORISED);
    }

    const newCourse = {
      ...req.body,
    };
    const _course = await course.create(newCourse);
    if (_course.errors) {
      return Helpers.dbError(res, _course);
    }
    await TelegramController.newCourseUpdate(_course.rows[0]);
    // await newCourseUpdate(_course.rows[0]);
    return Helpers.sendResponse(res, 200, SUCCESS, {
      course: _course.rows[0],
    });
  }

  static async deleteCourse(req, res) {
    const _course = await course.getById(req.params.id);
    if (_course.errors) return Helpers.dbError(res, _course);

    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role === 2 || _course.row.author_id === currentuser.id) {
      const _del = await course.delete({ id: req.params.id });
      if (_del.errors) {
        return Helpers.dbError(res, _del);
      }
      return Helpers.sendResponse(res, 200, SUCCESS);
    }
    return Helpers.sendResponse(res, 404, NOT_AUTHORISED);
  }

  static async courseStatus(req, res) {
    const _status = await status.getAll();
    console.log(_status);
    if (_status.errors) {
      return Helpers.dbError(res, _status);
    }
    return Helpers.sendResponse(res, 200, SUCCESS, { status: _status.rows });
  }

  static async getCourseProgress(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _progress = await progress.allWhere({
      course_id: req.params.id,
      user_id: currentuser.id,
    });
    if (_progress.errors) return Helpers.dbError(res, _progress);
    return Helpers.sendResponse(res, 200, SUCCESS, { progress: _progress.rows });
  }

  static async updateCourseProgress(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _progress = await progress.update(
      { progress_value: req.body.progress_value },
      {
        course_id: req.params.id,
        user_id: currentuser.id,
      },
    );
    if (_progress.errors) return Helpers.dbError(res, _progress);
    return Helpers.sendResponse(res, 200, SUCCESS, { progress: _progress.rows });
  }
}

export default CourseController;
