import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.createUser);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/password-reset', authController.passwordReset);

router.post('/password-update', authController.passwordUpdate);

router.get('/verify-email/:id/:token', authController.verifyEmail);

router.post('/refreshToken', authController.refreshToken);

router.post('/verify-email/retry', authController.retryEmailVerification);

module.exports = router;
