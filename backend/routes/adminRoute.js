import express from 'express';
import { verifyAdminUserToken } from '../middlewares/authCheck';
import AdminController from '../controllers/adminController';

const router = express.Router();

router.use(verifyAdminUserToken);

router.post('/create-course', AdminController.createCourse);

router.post('/add-course-lesson', AdminController.addCourseLesson);

router.delete('/delete-course/:id', AdminController.deleteCourse);

router.delete('/delete-course-lesson/:id', AdminController.deleteCourseLesson);

router.post('/create-user', AdminController.createUser);

router.delete('/delete-user/:id', AdminController.deleteUser);

router.get('/all-users', AdminController.allUsers);

module.exports = router;
