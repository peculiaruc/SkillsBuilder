import express from 'express';
import GroupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/authCheck';

const router = express.Router();

router.use(verifyToken);

router.post('/create', GroupController.createGroup);

router.get('/:id', GroupController.groupById);

router.put('/:id', GroupController.updateGroup);

router.get('/all', GroupController.getAllGroups);

router.delete('/:id', GroupController.deleteGroup);

router.post('/:id/join', GroupController.joinGroup);

router.post('/:id/leave', GroupController.leaveGroup);

router.get('/:id/requests', GroupController.getGroupRequests);

router.put('/requests/:id', GroupController.updateGroupRequest);

router.delete('/requests/:id', GroupController.deleteGroupRequest);

router.get('/:id/members', GroupController.groupMembers);

module.exports = router;
