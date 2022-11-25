import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Database from '../db/db';
import Token from '../models/token';
import Helpers from '../helpers/helpers';

dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;
const db = new Database();
const tokn = new Token();

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(404).json({
      status: 'error',
      error: 'User is not Authenticated',
    });
  }
  try {
    const verified = await jwt.verify(token, secretKey);
    req.user = verified;
    // console.log('req.user');
    if (!verified) {
      return res.status(404).json({
        status: 'error',
        error: 'Invalid or expired token',
      });
    }
    return next();
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: 'Invalid token',
    });
  }
};

exports.verifyAuthorUserToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(404).json({
      status: 'error',
      error: 'User is not Authenticated',
    });
  }
  try {
    const verified = await jwt.verify(token, secretKey);
    const userId = verified.id;

    const response = await db.queryBuilder('SELECT * FROM users WHERE id = $1', [userId]);
    // console.log('response', response.rows);
    const user = response.rows[0];
    if (user?.role !== 1) {
      return res.status(404).json({
        status: 'error',
        error: 'Only course owners can perform this action',
      });
    }
    return next();
  } catch (err) {
    res.status(404).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.verifyAdminUserToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(404).json({
      status: 'error',
      error: 'User is not Authenticated',
    });
  }
  try {
    const verified = await jwt.verify(token, secretKey);
    const userId = verified.id;

    const response = await db.queryBuilder('SELECT * FROM users WHERE id = $1', [userId]);
    // console.log('response', response.rows);
    const user = response.rows[0];
    if (user?.role !== 2) {
      return res.status(404).json({
        status: 'error',
        error: 'Only admins perform this action',
      });
    }
    return next();
  } catch (err) {
    res.status(404).json({
      status: 'error',
      error: err.message,
    });
  }
};
