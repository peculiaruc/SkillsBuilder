import express from 'express';

import socialLoginController from '../controllers/socialLoginController';

const router = express.Router();

router.post('/google', socialLoginController.googleLogin);
router.post('/linkedin', socialLoginController.linkedInLogin);

module.exports = router;
