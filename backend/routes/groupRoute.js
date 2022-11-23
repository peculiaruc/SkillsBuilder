import express from 'express';
import GroupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/authCheck';

const router = express.Router();

router.use(verifyToken);

router.post('/create', GroupController.createGroup);

router.get('/:id', GroupController.groupById);

router.delete('/:id', GroupController.deleteGroup);

router.post('/join', GroupController.joinGroup);

router.post('/leave', GroupController.leaveGroup);

router.post('/mygroups', GroupController.myGroups);

router.post('/:courseId', GroupController.groupByCourse);

module.exports = router;
