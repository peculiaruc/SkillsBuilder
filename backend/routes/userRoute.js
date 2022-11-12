import express from 'express';
import userController from '../controllers/userController';


const router = express.Router();

router.post('/register', userController.createUser);

router.post('/login', userController.login);

router.post('/password-reset', userController.passwordReset);

router.post('/password-update', userController.passwordUpdate);

router.get('/verify-email/:id/:token', userController.verifyEmail);

module.exports = router;
