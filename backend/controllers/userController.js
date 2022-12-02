import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmails';
import User from '../models/users';
import Token from '../models/token';
import Helpers from '../helpers/helpers';
import Enrollment from '../models/enrollments';
import Course from '../models/course';
import Database from '../db/db';

dotenv.config();

const user = new User();
const tokn = new Token();
const enroll = new Enrollment();
const course = new Course();
const db = new Database();
class UserController {
  static async getAllUsers(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const _users = await user.all();
    if (_users.errors) return Helpers.dbError(res, _users);
    return Helpers.sendResponse(res, 200, 'success', { users: _users.rows });
  }

  static async createUser(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }

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
      ${process.env.BASE_URL}/api/v1/auth/verify-email/${_user.rows[0].id}/${saveToken.rows[0].token}</p>`;

      const credentials = `
      Welcome to skillBuddy
      Log in to your account using the following credentials
      email: ${_user.rows[0].email}
      password: ${password}`;

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

  static async getUserById(req, res) {
    const _user = await user.getById(req.params.id);
    if (_user.errors) return Helpers.dbError(res, _user);
    return Helpers.sendResponse(res, 200, 'success', { user: _user.row });
  }

  static async updateUser(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    const _user = await user.getById(req.params.id);
    if (_user.errors) return Helpers.dbError(res, _user);
    if (_user.count === 0) return Helpers.sendResponse(res, 400, 'User with Id not found!');

    if (currentuser.role === 2 || currentuser.id === _user.row.id) {
      const newUpdate = {
        ...req.body,
      };
      const updateduser = await user.update(newUpdate, { id: req.params.id });
      if (updateduser.errors) return Helpers.dbError(res, updateduser);

      return Helpers.sendResponse(res, 200, 'success', { user: updateduser.rows[0] });
    }

    return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
  }

  static async deleteUser(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
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

  static async getUserCourses(req, res) {
    const _course = await db.queryBuilder(
      `SELECT courses.title, courses.author_id, courses.description, enrollments.id, enrollments.course_id, enrollments.enroll_date, enrollments.unenroll_date FROM courses JOIN enrollments ON enrollments.course_id = courses.id WHERE enrollments.user_id = ${req.params.id};`
    );
    // const _course = await enroll.allWhere({ user_id: req.params.id });
    if (_course.errors) return Helpers.dbError(res, _course);
    return Helpers.sendResponse(res, 200, 'success', { courses: _course.rows });
  }

  static async getAuthorsLearners(req, res) {
    const _enrollments = await db.queryBuilder(
      `SELECT users.fullname, users.email, users.phone, users.city, enrollments.enroll_date, enrollments.unenroll_date FROM users JOIN enrollments ON enrollments.user_id = users.id WHERE enrollments.author_id = ${req.params.id};`
    );

    if (_enrollments.errors) return Helpers.dbError(res, _enrollments);
    return Helpers.sendResponse(res, 200, 'success', { learners: _enrollments.rows });
  }

  static async getAllAuthors(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const _users = await user.allWhere({ role: 1 });
    if (_users.errors) return Helpers.dbError(res, _users);
    return Helpers.sendResponse(res, 200, 'success', { authors: _users.rows });
  }

  static async getAllLearners(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const _users = await user.allWhere({ role: 0 });
    if (_users.errors) return Helpers.dbError(res, _users);
    return Helpers.sendResponse(res, 200, 'success', { authors: _users.rows });
  }

  static async getAllAdmins(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    if (currentuser.role !== 2) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const _users = await user.allWhere({ role: 2 });
    if (_users.errors) return Helpers.dbError(res, _users);
    return Helpers.sendResponse(res, 200, 'success', { authors: _users.rows });
  }
}

export default UserController;
