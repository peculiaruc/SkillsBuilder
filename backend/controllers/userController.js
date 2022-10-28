import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import db from '../db/db';

dotenv.config();

exports.createUser = async (req, res) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const findUser = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (findUser.rows.length) {
      return res.status(400).json({
        status: 'error',
        error: 'User with email already exists. Please Log in',
      });
    }

    const resp = await db.query(
      'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [req.body.firstname, req.body.email, hashedPassword, req.body.city, req.body.auth_method]
    );

    console.log(resp.rows[0]);

    //  create token
    const token = jwt.sign({ id: resp.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '24H',
    });

    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user: resp.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);

    if (user.rows.length) {
      const validPass = await bcryptjs.compare(req.body.password, user.rows[0].password);

      if (!validPass) {
        return res.status(400).json({
          status: 'error',
          error: 'invalid Password',
        });
      }
      //  create token
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '2H',
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
    return res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.passwordReset = async (req, res) => {
  try {
    // const schema = Joi.object({ email: Joi.string().email().required() });
    // const { error } = schema.validate(req.body.email);
    // if (error) return res.status(400).send(error.details[0].message);

    // check if email exists
    const findUser = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);

    if (!findUser.rows.length) {
      return res.status(400).json({
        status: 'error',
        error: 'User with given email does not exist',
      });
    }

    // create token if dosent exist
    let userId = findUser.rows[0].id;
    let randomToken = crypto.randomBytes(32).toString('hex');
    let token = await db.query('SELECT * FROM tokens WHERE user_id = $1', [userId]);
    if (!token.rows.length) {
      token = await db.query('INSERT INTO tokens(user_id, token) VALUES($1, $2) RETURNING *', [
        userId,
        randomToken,
      ]);
    }

    // email user the link
    const link = `${process.env.BASE_URL}/password-reset/${userId}/${token.rows[O].token}`;
    await sendEmail(findUser.rows[0].email, 'Password reset', link);

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'password reset link sent to your email account',
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }
};
