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

// router.get('/:id/mygroups', UserController.getUserGroups);

// router.get('/:id/myassignments', userController.getUserAssignments);

// router.get('/:id/learners', UserController.getAuthorsLearners);

// router.get('/authors', userController.getUserGroups);

// router.get('/learners', userController.getUserGroups);

// router.get('/admins', userController.getUserGroups);

module.exports = router;
