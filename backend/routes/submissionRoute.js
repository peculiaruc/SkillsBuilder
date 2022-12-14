import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import SubmissionController from '../controllers/submissionController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', SubmissionController.createSubmission);

router.get('/:id', SubmissionController.getSubmissionById);

module.exports = router;
