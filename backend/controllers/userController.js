import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/db';

dotenv.config();

exports.createUser = async (req, res) => {
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
}

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
}
