import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import courseController from '../controllers/courseController';

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

router.get('/:id/lessons', courseController.getCourseLessons);

router.get('/:id/materials', courseController.getCourseMaterials);

router.get('/:id/author', courseController.getCourseAuthor);

router.get('/status', courseController.courseStatus);

router.get('/categories', courseController.getCourseCategories);

router.get('/:id/progress', courseController.getCourseProgress);

router.put('/:id/progress', courseController.updateCourseProgress);

module.exports = router;
