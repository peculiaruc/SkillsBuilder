import express from 'express';
import { verifyToken, verifyAdminUserToken, verifyAuthorUserToken } from '../helpers/authCheck';
import assignmentController from '../controllers/assignmentController';

const router = express.Router();

router.post('/get-course-assignment', verifyToken, assignmentController.getCourseAssignments);

router.post(
  '/get-assignment-submissions',
  verifyToken,
  assignmentController.getAssignmentSubmissions
);

router.post('/submit-assignment', verifyToken, assignmentController.createAssignmentSubmissions);

router.post('/:id', verifyToken, assignmentController.getAssignmentById);

router.post('/get-assignment-questions', verifyToken, assignmentController.getAssignmentQuestions);

router.post('/create-assignment', verifyAuthorUserToken, assignmentController.createAssignment);

router.post('/get-enrolled-users', verifyAuthorUserToken, assignmentController.getUsersInMyCourse);
