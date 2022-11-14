import express from 'express';
import { verifyToken, verifyAdminUserToken } from '../helpers/authCheck';
import courseController from '../controllers/courseController';
import adminCourseController from '../controllers/adminCourseController';

const router = express.Router();

router.get('/courses', verifyToken, courseController.getAllCourses);

router.post('/filter-courses', verifyToken, courseController.getCoursesByCategories);

router.post('/enrolled-courses', verifyToken, courseController.getEnrolledCourses);

router.get('/categories', verifyToken, courseController.getCourseCategory);

router.post('/enroll-in-course', verifyToken, courseController.enrollUser);

router.post('/get-course-assignment', verifyToken, courseController.getCourseAssignments);

router.post('/get-assignment-submissions', verifyToken, courseController.getAssignmentSubmissions);

router.post('/submit-assignment', verifyToken, courseController.createAssignmentSubmissions);

router.post('/:id', verifyToken, courseController.getCoursesById);

router.post('/create-course', verifyAdminUserToken, adminCourseController.createCourse);

router.post('/add-course-lesson', verifyAdminUserToken, adminCourseController.addCourseLesson);

router.post('/delete-course', verifyAdminUserToken, adminCourseController.deleteCourse);

router.post(
  '/delete-course-lesson',
  verifyAdminUserToken,
  adminCourseController.deleteCourseLesson
);

module.exports = router;
