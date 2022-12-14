import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import QuestionController from '../controllers/questionController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', QuestionController.createQuestion);

router.get('/:id', QuestionController.getQuestionById);

router.put('/:id', QuestionController.updateQuestion);

router.delete('/:id', QuestionController.deleteQuestion);

module.exports = router;
