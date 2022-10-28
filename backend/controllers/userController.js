import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/db';
import { Pool } from 'pg';

dotenv.config();

let pool;
if (process.env.NODE_ENV === 'production') {
  // On production server using heroku db connection string
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
} else {
  // created a Pool using local env default config on local
  pool = new Pool({ connectionString: process.env.DEV_DATABASE_URL });
}

exports.createUser = async (req, res) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const findUser = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (findUser.rows.length) {
      return res.status(400).json({
        status: 'error',
        error: 'User with email already exists. Please Log in',
      });
    }

    const resp = await pool.query(
      'INSERT INTO users(fullName, email, password, city, auth_method) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [req.body.firstname, req.body.email, hashedPassword, req.body.city, req.body.auth_method]
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
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }
};
