import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import LessonsController from '../controllers/lessonsController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', LessonsController.createCourseLessons);

router.get('/:id', LessonsController.getLessonById);

router.put('/:id', LessonsController.updateLesson);

router.delete('/:id', LessonsController.deleteLesson);

module.exports = router;
