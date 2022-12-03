import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import assignmentController from '../controllers/assignmentController';

const router = express.Router();

// router.post('/assignments', verifyToken, assignmentController.getCourseAssignments);

// router.post('/submissions', verifyToken, assignmentController.getAssignmentSubmissions);

// router.post('/submit', verifyToken, assignmentController.createAssignmentSubmissions);

// router.get('/:id', verifyToken, assignmentController.getAssignmentById);

// router.post('/questions', verifyToken, assignmentController.getAssignmentQuestions);

// router.post('/enrolledusers', verifyAuthorUserToken, assignmentController.getUsersInMyCourse);

// router.post(
//   '/create-question',
//   verifyAdminUserToken,
//   assignmentController.createAssignmentQuestions
// );

router.use(verifyToken);

router.post('/create', assignmentController.createAssignment);

router.get('/:id', assignmentController.getAssignmentById);

router.put('/:id', assignmentController.updateAssignment);

router.delete('/:id', assignmentController.deleteAssignment);

router.get('/:id/questions', assignmentController.getAssignmentQuestions);

module.exports = router;
