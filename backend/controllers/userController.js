import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import db from '../db/db';
import sendEmail from '../utils/sendEmails';

dotenv.config();

exports.createUser = async (req, res) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

<<<<<<< HEAD
  const findUser = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
  if (findUser.rows.length) {
=======
    const findUser = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (findUser.rows.length) {
      return res.status(400).json({
        status: 'error',
        error: 'User with email already exists. Please Log in',
      });
    }

    const resp = await db.query(
      'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [req.body.fullname, req.body.email, hashedPassword, req.body.city, req.body.auth_method]
    );

    // console.log(resp.rows[0]);

    //  create token
    const token = jwt.sign({ id: resp.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '24H',
    });

    // send confirmation and verification Email

    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user: resp.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
>>>>>>> c563641dd4279d57dd3e9bf4f84bc9daa311a044
    return res.status(400).json({
      status: 'error',
      error: 'User with email already exists. Please Log in',
    });

  }
  
  const resp = await db.query(
    'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [req.body.fullname, req.body.email, hashedPassword, req.body.city, req.body.auth_method],
  );

  console.log(resp.rows[0]);

  //  create token
  const token = jwt.sign({ id: resp.rows[0].id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '24H',
  });

  res.status(200).json({
    status: 'success',
    data: {
      token,
      user: resp.rows[0],
    },
  });
};

exports.login = async (req, res) => {
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
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'Account not verified',
      });
    }

    // email user the link
    const link = `${process.env.BASE_URL}/password-reset/${userId}/${token.rows[0].token}`;
    let sent = await sendEmail(req.body.email, 'Password reset', link);

    if (sent) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'password reset link sent to your email account',
        },
      });
    } else {
      await db.query('DELETE FROM tokens WHERE user_id = $1', [userId]);
      return res.status(500).json({
        status: 'error',
        error: `Email not sent ${sent}`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.passwordUpdate = async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [req.body.user_id]);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: 'User does not exist',
      });
    }
    const token = await db.query('SELECT * FROM tokens WHERE user_id = $1', [req.body.user_id]);

    if (!token) {
      return res.status(400).json({
        status: 'error',
        error: 'Link is invalid or expired',
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const update = await db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [
      hashedPassword,
      req.body.user_id,
    ]);

    console.log('new user', update.rows[0]);

    await db.query('DELETE FROM tokens WHERE user_id = $1', [req.body.user_id]);

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
};
