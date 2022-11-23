import Helpers from '../helpers/helpers';
import Course from '../models/course';
import CourseLesson from '../models/courseLesson';
import Enrollment from '../models/enrollments';
import Token from '../models/token';
import User from '../models/users';
import sendEmail from '../utils/sendEmails';

const course = new Course();
const user = new User();
const lesson = new CourseLesson();
const tokn = new Token();
const enroll = new Enrollment();

class AdminController {
  static async createCourse(req, res) {
    const newCourse = {
      name: req.body.name,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      summary: req.body.summary,
      category_ids: req.body.category,
    };
    const _course = await course.create(newCourse);
    if (_course.errors) {
      return Helpers.dbError(res, _course);
    }
    return Helpers.sendResponse(res, 200, 'Course created successfully', {
      course: _course.rows[0],
    });
  }

  static async addCourseLesson(req, res) {
    const newLesson = {
      course_id: req.body.courseId,
      description: req.body.description,
      lesson_no: req.body.lessonNo,
      lesson_content: req.body.lessonContent,
      lesson_content_type: req.body.lessonContentType,
    };
    const _lesson = await lesson.create(newLesson);
    if (_lesson.errors) {
      return Helpers.dbError(res, _lesson);
    }
    return Helpers.sendResponse(res, 200, 'Course Lesson created successfully', {
      lesson: _lesson.rows[0],
    });
  }

  static async deleteCourseLesson(req, res) {
    const _del = await lesson.delete({ id: req.params.id });
    if (_del.errors) {
      return Helpers.dbError(res, _del);
    }
    return Helpers.sendResponse(res, 200, 'Course Lesson deleted successfully');
  }

  static async deleteCourse(req, res) {
    const _del = await course.delete({ id: req.params.id });
    if (_del.errors) {
      return Helpers.dbError(res, _del);
    }
    return Helpers.sendResponse(res, 200, 'Course deleted successfully');
  }

  static async createUser(req, res) {
    const password = Helpers.generateRandomPassword();
    const hashedPass = Helpers.hashPassword(password);

    const emailCheck = await user.getByEmail(req.body.email);

    if (emailCheck.errors) {
      return Helpers.dbError(res, emailCheck);
    }

    if (emailCheck.count > 0) {
      return Helpers.sendResponse(res, 400, 'A user with Email address already exists !');
    }

    const newUser = {
      email: req.body.email,
      password: hashedPass,
      fullname: req.body.fullname,
      city: req.body.city,
      auth_method: 'emailpassword',
      role: req.body.role,
    };

    const _user = await user.create(newUser);
    const randomToken = Helpers.createRandomToken();
    if (_user.errors) return Helpers.dbError(res, _user);
    if (_user.count > 0) {
      const newToken = {
        user_id: _user.rows[0].id,
        token: randomToken,
        type: 'verify',
      };
      const saveToken = await tokn.create(newToken);
      if (saveToken.errors) return Helpers.dbError(res, saveToken);

      const link = `<p>
      ${process.env.BASE_URL}/api/v1/auth/verify-email/${saveUser.rows[0].id}/${saveToken.rows[0].token}</p>`;

      const credentials = `
      <p>Welcome to skillBuddy</p>
      <p>Log in to your account using the following credentials</p>
      <p>email: ${_user.rows[0].email}</p>
      <p>password: password}</p>`;

      await sendEmail(_user.rows[0].email, 'Verify Email', link);

      await sendEmail(_user.rows[0].email, 'Account Details', credentials);

      const token = Helpers.generateToken(_user.rows[0].id);
      const refreshToken = Helpers.generateRefreshToken(_user.rows[0].id);

      return Helpers.sendResponse(res, 200, 'User created successfully', {
        token,
        refreshToken,
        user: _user.rows[0],
      });
    }
  }

  static async deleteUser(req, res) {
    const _deletedUser = await user.delete({ id: req.params.id });
    if (_deletedUser.errors) {
      return Helpers.dbError(res, _deletedUser);
    }
    const _deleteEnroll = await enroll.delete({ user_id: req.params.id });
    if (_deleteEnroll.errors) {
      return Helpers.dbError(res, _deleteEnroll);
    }
    return Helpers.sendResponse(res, 200, 'User deleted successfully');
  }

  static async allUsers(req, res) {
    const _users = user.all(req.query.limit, req.query.offset);
    if (_users.errors) {
      return Helpers.dbError(res, _users);
    }
    return Helpers.sendResponse(res, 200, 'success', { users: _users.rows });
  }
}

export default AdminController;
