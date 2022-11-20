import express from 'express';

import { linkedInLogin, googleLogin } from '../controllers/socialLoginController';

const router = express.Router();

router.post('/google', googleLogin);
router.post('/linkedin', linkedInLogin);

module.exports = router;
