import express from 'express';
import { verifyToken, verifyAdminUserToken } from '../helpers/authCheck';
import courseController from '../controllers/courseController';

const router = express.Router();

router.get('/courses', verifyToken, courseController.getAllCourses);

router.post('/filter-courses', verifyToken, courseController.getCoursesByCategories);

router.post('/enrolled-courses', verifyToken, courseController.getEnrolledCourses);

router.get('/categories', verifyToken, courseController.getCourseCategory);

router.post('/enroll-in-course', verifyToken, courseController.enrollUser);

module.exports = router;
