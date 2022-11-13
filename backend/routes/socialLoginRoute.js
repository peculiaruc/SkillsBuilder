import express from 'express';

import socialLoginController from '../controllers/socialLoginController';

const router = express.Router();

router.post('/linkedin', socialLoginController.linkedInLogin);
router.post('/google', socialLoginController.googleLogin);

module.exports = router;
