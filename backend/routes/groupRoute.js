import express from 'express';
import GroupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/authCheck';

const router = express.Router();

router.use(verifyToken);

router.post('/create', GroupController.createGroup);

router.get('/:id', GroupController.groupById);

router.put('/:id', GroupController.updateGroup);

router.delete('/:id', GroupController.deleteGroup);

router.post('/:id/join', GroupController.joinGroup);

router.post('/:id/leave', GroupController.leaveGroup);

module.exports = router;
