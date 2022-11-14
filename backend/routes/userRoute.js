import express from 'express';
import {
  createUser,
  login,
  passwordReset,
  passwordUpdate,
  verifyEmail,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', createUser);

router.post('/login', login);

router.post('/password-reset', passwordReset);

router.post('/password-update', passwordUpdate);

router.get('/verify-email/:id/:token', verifyEmail);

module.exports = router;
