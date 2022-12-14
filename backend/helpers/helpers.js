import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Database from '../db/db';
import { DATABASE_ERROR } from '../utils/constants';

const db = new Database();
class Helpers {
  static hashPassword(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  }

  static comparePassword(hashPassword, password) {
    return bcryptjs.compareSync(password, hashPassword);
  }

  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2h' });
  }

  static generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
  }

  static generateRandomPassword() {
    let pass = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    return pass;
  }

  static createRandomToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static validationResponse(validation, response) {
    if (validation.error != null) {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"').join(''));
      }
      return Helpers.sendResponse(response, 422, errors);
    }
  }

  static sendResponse(response, codeStatus, message, data = undefined) {
    const res = {
      message,
      status: codeStatus,
    };
    if (data !== undefined) {
      res.data = data;
    }
    return response.status(codeStatus).json(res);
  }

  static dbError(response, query) {
    if (query.errors) {
      console.log(query.errors);
      return Helpers.sendResponse(response, 500, DATABASE_ERROR);
    }
  }

  static Error(response, query) {
    if (query.errors) {
      console.log(query.errors);
      return Helpers.sendResponse(response, 500, errors.message);
    }
  }

  static async getLoggedInUser(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(404).json({
        status: 'error',
        error: 'User is not Authenticated',
      });
    }
    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const userId = verified.id;

    const _user = await db.queryBuilder('SELECT * FROM users WHERE id = $1', [userId]);
    // console.log('response', response.rows);
    if (_user.errors) {
      return Helpers.dbError(res, _user);
    }
    const user = _user.rows[0];
    return user;
  }
}

export default Helpers;
