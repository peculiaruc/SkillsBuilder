import express from 'express';
import { verifyToken, verifyAuthorUserToken, verifyAdminUserToken } from '../middlewares/authCheck';
import courseController from '../controllers/courseController';
import adminController from '../controllers/adminController';

const router = express.Router();

router.use(verifyToken);

router.get('/all', courseController.getAllCourses);

router.get('/:id', courseController.getCoursesById);

router.post('/create', courseController.createCourse);

router.delete('/:id', courseController.deleteCourse);

router.post('/:id/enroll', courseController.enrollUser);

router.put('/:id', courseController.updateCourse);

router.post('/filter', courseController.getCoursesByCategories);

router.get('/categories', courseController.getCourseCategories);

router.post('/:id/unenroll', courseController.unEnrollUser);

router.get('/:id/learners', courseController.courseLearners);

router.get('/:id/assignments', courseController.getCourseAssignments);

router.get('/:id/materials', courseController.getCourseLessons);

router.get('/:id/author', courseController.getCourseAuthor);

router.get('/status', courseController.courseStatus);

module.exports = router;
