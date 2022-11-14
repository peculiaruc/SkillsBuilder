import express from 'express';
import { verifyToken, verifyAdminUserToken } from '../helpers/authCheck';
import {
  getAllCourses,
  getCourseCategory,
  getCoursesByCategories,
  getEnrolledCourses,
  enrollUser,
  getCourseAssignments,
  getAssignmentSubmissions,
  createAssignmentSubmissions,
  getCoursesById,
} from '../controllers/courseController';
import {
  createCourse,
  addCourseLesson,
  deleteCourse,
  deleteCourseLesson,
} from '../controllers/adminCourseController';

const router = express.Router();

router.get('/courses', verifyToken, getAllCourses);

router.post('/filter-courses', verifyToken, getCoursesByCategories);

router.post('/enrolled-courses', verifyToken, getEnrolledCourses);

router.get('/categories', verifyToken, getCourseCategory);

router.post('/enroll-in-course', verifyToken, enrollUser);

router.post('/get-course-assignment', verifyToken, getCourseAssignments);

router.post('/get-assignment-submissions', verifyToken, getAssignmentSubmissions);

router.post('/submit-assignment', verifyToken, createAssignmentSubmissions);

router.post('/:id', verifyToken, getCoursesById);

router.post('/create-course', verifyAdminUserToken, createCourse);

router.post('/add-course-lesson', verifyAdminUserToken, addCourseLesson);

router.post('/delete-course', verifyAdminUserToken, deleteCourse);

router.post('/delete-course-lesson', verifyAdminUserToken, deleteCourseLesson);

module.exports = router;
