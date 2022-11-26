import express from 'express';
import { verifyToken, verifyAdminUserToken, verifyAuthorUserToken } from '../middlewares/authCheck';
import assignmentController from '../controllers/assignmentController';

const router = express.Router();

router.post('/assignments', verifyToken, assignmentController.getCourseAssignments);

router.post('/submissions', verifyToken, assignmentController.getAssignmentSubmissions);

router.post('/submit', verifyToken, assignmentController.createAssignmentSubmissions);

router.get('/:id', verifyToken, assignmentController.getAssignmentById);

router.post('/questions', verifyToken, assignmentController.getAssignmentQuestions);

router.post('/create', verifyAuthorUserToken, assignmentController.createAssignment);

router.post('/enrolledusers', verifyAuthorUserToken, assignmentController.getUsersInMyCourse);

router.post(
  '/create-question',
  verifyAdminUserToken,
  assignmentController.createAssignmentQuestions
);

module.exports = router;
