import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import courseController from '../controllers/courseController';

const router = express.Router();

router.use(verifyToken);

router.get('/courses', courseController.getAllCourses);

router.post('/filter-courses', courseController.getCoursesByCategories);

router.post('/enrolled-courses', courseController.getEnrolledCourses);

router.get('/categories', courseController.getCourseCategory);

router.post('/enroll-in-course', courseController.enrollUser);

router.post('/:id', courseController.getCoursesById);

module.exports = router;
