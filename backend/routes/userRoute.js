import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.createUser);

router.post('/login', userController.login);

module.exports = router;
