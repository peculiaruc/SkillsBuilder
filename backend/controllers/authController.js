import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmails';
import User from '../models/users';
import Token from '../models/token';
import Helpers from '../helpers/helpers';

dotenv.config();

const user = new User();
const tokn = new Token();

class AuthController {
  static async createUser(req, res) {
    const hashedPassword = Helpers.hashPassword(req.body.password);
    const checkEmail = await user.getByEmail(req.body.email);

    if (checkEmail.errors) {
      return Helpers.dbError(res, checkEmail);
    }

    if (checkEmail.count > 0) {
      return Helpers.sendResponse(res, 400, 'A user with Email address already exists !');
    }
    const newUser = {
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname,
      city: req.body.city,
      auth_method: 'emailpassword',
    };

    const saveUser = await user.create(newUser);
    const randomToken = Helpers.createRandomToken();
    if (saveUser.errors) return Helpers.dbError(res, saveUser);
    if (saveUser.count > 0) {
      const newToken = {
        user_id: saveUser.rows[0].id,
        token: randomToken,
        type: 'verify',
      };
      const saveToken = await tokn.create(newToken);
      if (saveToken.errors) return Helpers.dbError(res, saveToken);

      const link = `${process.env.BASE_URL}/api/v1/auth/verify-email/${saveUser.rows[0].id}/${saveToken.rows[0].token}`;
      await sendEmail(saveUser.rows[0].email, 'Verify Email', link);

      const token = Helpers.generateToken(saveUser.rows[0].id);
      const refreshToken = Helpers.generateRefreshToken(saveUser.rows[0].id);

      return Helpers.sendResponse(res, 200, 'User created successfully', {
        token,
        refreshToken,
        user: saveUser.rows[0],
      });
    }
  }

  static async login(req, res) {
    const _user = await user.getByEmail(req.body.email);
    if (_user.error) return Helpers.dbError(res, _user);

    if (_user.count > 0 && Helpers.comparePassword(_user.row.password, req.body.password)) {
      const token = Helpers.generateToken(_user.row.id);
      const refreshToken = Helpers.generateRefreshToken(_user.row.id);

      const oldToken = await tokn.allWhere({ user_id: _user.row.id, type: 'refresh' });
      if (oldToken.errors) return Helpers.dbError(res, oldToken);

      if (oldToken.count > 0) {
        const delOldToken = await tokn.delete({ id: oldToken.rows[0].id });
        if (delOldToken.errors) return Helpers.dbError(res, delOldToken);
      }

      const newToken = {
        user_id: _user.row.id,
        token: refreshToken,
        type: 'refresh',
      };
      const saveToken = await tokn.create(newToken);
      if (saveToken.errors) {
        return Helpers.dbError(res, saveToken);
      }
      return Helpers.sendResponse(res, 200, 'User successfully logged in', {
        token,
        refreshToken,
        user: _user.row,
      });
    }
    return Helpers.sendResponse(res, 400, 'Invalid credentials');
  }

  static async passwordReset(req, res) {
    const { email } = req.body;
    const _user = await user.getByEmail(email);
    if (_user.errors) return Helpers.dbError(res, _user);
    if (_user.count > 0) {
      const randomToken = Helpers.createRandomToken();
      const savedToken = await tokn.getTokenByUser(_user.row.id);
      if (savedToken.count > 0) {
        tokn.delete({ token: savedToken.row.id });
      }
      const newToken = {
        user_id: _user.row.id,
        token: randomToken,
        type: 'reset',
      };
      const saveToken = await tokn.create(newToken);
      if (saveToken.errors) return Helpers.dbError(res, saveToken);

      return Helpers.sendResponse(res, 200, 'User password reset details', {
        reset_token: saveToken.rows[0].token,
        user_id: saveToken.rows[0].user_id,
      });
    }
    return Helpers.sendResponse(res, 400, 'User with email does not exist');
  }

  static async passwordUpdate(req, res) {
    const { resetToken, user_id, password } = req.body;

    const _user = await user.getById(user_id);
    if (_user.errors) return Helpers.dbError(res, _user);
    if (_user.count > 0) {
      // check if token is valid
      const savedToken = await tokn.allWhere({ id, token: resetToken, type: 'reset' });
      if (savedToken.errors) return Helpers.dbError(res, savedToken);
      if (savedToken.count > 0) {
        const hashedPass = Helpers.hashPassword(password);
        const update = await user.update({ password: hashedPass }, { id: user_id });
        if (update.errors) return Helpers.dbError(res, update);
        if (update.count > 0) {
          await tokn.delete({ id: savedToken.rows[0].id });
          return Helpers.sendResponse(res, 200, 'password reset sucessfully', {});
        }
      }
    }
    return Helpers.sendResponse(res, 400, 'User does not exist');
  }

  static async verifyEmail(req, res) {
    const { id, token } = req.params;
    const _user = await user.getById(id);
    if (_user.errors) return Helpers.dbError(res, _user);
    if (_user.count > 0) {
      const savedToken = await tokn.allWhere({ id, token, type: 'verify' });
      if (savedToken.errors) return Helpers.dbError(res, savedToken);
      if (savedToken.count > 0) {
        const update = await user.update({ verified: true }, { id });
        if (update.errors) return Helpers.dbError(res, update);
        if (update.count > 0) {
          await tokn.delete({ id: savedToken.rows[0].id });
          return Helpers.sendResponse(res, 200, 'email verified successfully', {});
        }
      }
      return Helpers.sendResponse(res, 400, 'Link is invalid or expired');
    }
    return Helpers.sendResponse(res, 400, 'User does not exist');
  }

  static async logout(req, res) {
    const deleteTokens = await tokn.delete({ user_id: req.body.userId });
    if (deleteTokens.errors) {
      return Helpers.dbError(res, deleteTokens);
    }
    return Helpers.sendResponse(res, 200, 'Logout Sucessfull!');
  }

  static async refreshToken(req, res) {
    const savedToken = await tokn.allWhere({
      user_id: req.body.userId,
      token: req.body.refreshToken,
      type: 'refresh',
    });
    if (savedToken.errors) {
      return Helpers.dbError(res, savedToken);
    }
    if (savedToken.count > 0) {
      const newToken = Helpers.generateToken(req.body.userId);
      const newRefreshToken = Helpers.generateRefreshToken(req.body.userId);

      const deleteOld = await tokn.delete({ id: savedToken.rows[0].id });
      if (deleteOld.errors) {
        return Helpers.dbError(res, deleteOld);
      }
      const newTokenToSave = {
        user_id: req.body.userId,
        token: newRefreshToken,
        type: 'refresh',
      };

      const saveToken = await tokn.create(newTokenToSave);
      if (saveToken.errors) {
        return Helpers.dbError(res, saveToken);
      }

      return Helpers.sendResponse(res, 200, 'token refreshed successfully', {
        token: newToken,
        refreshToken: newRefreshToken,
      });
    }
  }

  static async retryEmailVerification(req, res) {
    const savedToken = await tokn.allWhere({ user_id: req.body.userId, type: 'verify' });
    if (savedToken.errors) return Helpers.dbError(res, savedToken);
    if (savedToken.count > 0) {
      const del = await tokn.delete({ id: savedToken.rows[0].id });
      if (del.errors) {
        return Helpers.dbError(res, del);
      }
    }
    const randomToken = Helpers.createRandomToken();
    const newToken = {
      user_id: req.body.userId,
      token: randomToken,
      type: 'verify',
    };
    const saveToken = await tokn.create(newToken);
    if (saveToken.errors) return Helpers.dbError(res, saveToken);

    const _user = await user.getById(req.body.userId);
    if (_user.errors) {
      return Helpers.dbError(res, _user);
    }

    const link = `${process.env.BASE_URL}/api/v1/auth/verify-email/${_user.row.id}/${saveToken.rows[0].token}`;
    await sendEmail(_user.row.email, 'Verify Email', link);
    return Helpers.sendResponse(res, 200, 'Verification email sent!', {});
  }
}

export default AuthController;
