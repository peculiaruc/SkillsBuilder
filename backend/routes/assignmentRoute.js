import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import assignmentController from '../controllers/assignmentController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', assignmentController.createAssignment);

router.get('/:id', assignmentController.getAssignmentById);

router.put('/:id', assignmentController.updateAssignment);

router.delete('/:id', assignmentController.deleteAssignment);

router.get('/:id/questions', assignmentController.getAssignmentQuestions);

router.get('/:id/submissions', assignmentController.getAssignmentSubmissions);

router.post('/authors/:id/submissions', assignmentController.getAuthorAssignmentSubmissions);

module.exports = router;
