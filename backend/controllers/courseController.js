import sendEmail from '../utils/sendEmails';
import Course from '../models/course';
import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Categories from '../models/categories';
import User from '../models/users';

const course = new Course();
const enrollment = new Enrollment();
const cat = new Categories();
const user = new User();

class CourseController {
  static async getAllCourses(req, res) {
    const { offset, limit } = req.query;
    const _courses = await course.all(limit || 5, offset || 0);
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
      course: _courses.rows[0],
    });
  }

  static async getEnrolledCourses(req, res) {
    const { user_id } = req.body;
    const _courses = await enrollment.getByUser(user_id);
    if (_courses.errors) return Helpers.dbError(res, _courses);
    return Helpers.sendResponse(res, 200, 'success', {
      course: _courses.rows,
      totalCourses: _courses.count,
    });
  }

  static async getCourseCategory(req, res) {
    const _categories = await cat.all();
    if (_categories.errors) return Helpers.dbError(res, _categories);
    return Helpers.sendResponse(res, 200, 'success', {
      categories: _categories.rows,
    });
  }

  static async enrollUser(req, res) {
    const { userId, courseId, courseName } = req.body;

    const _user = await user.getById(userId);
    if (_user.errors) return Helpers.dbError(res, _user);

    const newEnroll = {
      user_id: userId,
      course_id: courseId,
      enroll_date: new Date(),
    };
    const _enroll = await enrollment.create(newEnroll);
    if (_enroll.errors) return Helpers.dbError(res, _user);
    await sendEmail(
      _user.row.email,
      'Enrollment Confirmation',
      `You have successfully enrolled in ${courseName}`,
    );
    return Helpers.sendResponse(res, 200, 'success', {});
  }
}

export default CourseController;
