import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import UserController from '../controllers/userController';

const router = express.Router();

router.use(verifyToken);

router.get('/all', UserController.getAllUsers);

router.post('/create', UserController.createUser);

router.get('/:id', UserController.getUserById);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

router.get('/:id/mycourses', UserController.getUserCourses);

router.get('/:id/mygroups', UserController.getUserGroups);

router.get('/:id/myposts', UserController.getUserPosts);

router.get('/authors/:id/mycourses', UserController.getAuthorsCourses);

router.get('/authors/:id/assignments', UserController.getAuthorAssignments);

router.get('/:id/learners', UserController.getAuthorsLearners);

router.get('/authors/all', UserController.getAllAuthors);

router.get('/learners/all', UserController.getAllLearners);

router.get('/admins/all', UserController.getAllAdmins);

module.exports = router;
