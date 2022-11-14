import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import db from '../db/db';
import sendEmail from '../utils/sendEmails';

dotenv.config();

module.exports = {
  createUser: async (req, res) => {
    const { email, password, fullname, city, auth_method } = req.body;
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length) {
        return res.status(400).json({
          status: 'error',
          error: 'User with email already exists. Please Log in',
        });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = await db.query(
        'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [fullname, email, hashedPassword, city, auth_method]
      );

      const randomToken = crypto.randomBytes(32).toString('hex');
      const verifytoken = await db.query(
        'INSERT INTO tokens(user_id, token) VALUES($1, $2) RETURNING *',
        [newUser.rows[0].id, randomToken]
      );
      const link = `${process.env.BASE_URL}/api/v1/auth/verify-email/${newUser.rows[0].id}/${verifytoken.rows[0].token}`;
      await sendEmail(newUser.rows[0].email, 'Verify Email', link);

      const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '24H',
      });

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user: newUser.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (user.rows.length) {
        const validPass = await bcryptjs.compare(password, user.rows[0].password);

        if (!validPass) {
          return res.status(400).json({
            status: 'error',
            error: 'invalid Password',
          });
        }
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
          expiresIn: '24H',
        });
        return res.status(200).json({
          status: 'success',
          data: {
            token,
            user: user.rows[0],
          },
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'invalid email',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    }
  },

  passwordReset: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (!user.rows.length) {
        return res.status(400).json({
          status: 'error',
          error: 'User with given email does not exist',
        });
      }

      const userId = user.rows[0].id;
      let randomToken = crypto.randomBytes(32).toString('hex');
      let token = await db.query('SELECT * FROM tokens WHERE user_id = $1', [userId]);
      if (!token.rows.length) {
        token = await db.query('INSERT INTO tokens(user_id, token) VALUES($1, $2) RETURNING *', [
          userId,
          randomToken,
        ]);
      } else {
        return res.status(400).json({
          status: 'error',
          error: 'Account not verified',
        });
      }

      const link = `${process.env.BASE_URL}/password-reset/${userId}/${token.rows[0].token}`;
      const sent = await sendEmail(email, 'Password reset', link);

      if (sent) {
        return res.status(200).json({
          status: 'success',
          data: {
            message: 'password reset link sent to your email account',
          },
        });
      }
      await db.query('DELETE FROM tokens WHERE user_id = $1', [userId]);
      return res.status(500).json({
        status: 'error',
        error: `Email not sent ${sent}`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    }
  },

  passwordUpdate: async (req, res) => {
    const { user_id, password } = req.body;
    try {
      const user = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
      if (!user) {
        return res.status(400).json({
          status: 'error',
          error: 'User does not exist',
        });
      }
      const token = await db.query('SELECT * FROM tokens WHERE user_id = $1', [user_id]);

      if (!token) {
        return res.status(400).json({
          status: 'error',
          error: 'Link is invalid or expired',
        });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const update = await db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [
        hashedPassword,
        user_id,
      ]);

      await db.query('DELETE FROM tokens WHERE user_id = $1', [user_id]);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'password reset sucessfully!',
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 'error',
        error: err.message,
      });
    }
  },

  verifyEmail: async (req, res) => {
    const { id, token } = req.params;
    try {
      const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      if (!user) {
        return res.status(400).json({
          status: 'error',
          error: 'User does not exist',
        });
      }

      const savedToken = await db.query('SELECT * FROM tokens WHERE token = $1', [token]);
      if (!savedToken) {
        return res.status(400).json({
          status: 'error',
          error: 'Link is invalid or expired',
        });
      }

      const update = await db.query('UPDATE users SET verified = $1 WHERE id = $2 RETURNING *', [
        true,
        user.rows[0].id,
      ]);

      return res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 'error',
        error: err.message,
      });
    }
  },
};
