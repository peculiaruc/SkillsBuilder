import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import ContentController from '../controllers/lessonContentController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', ContentController.createContent);

router.get('/:id', ContentController.getContentById);

router.put('/:id', ContentController.updateContent);

router.delete('/:id', ContentController.deleteContent);

module.exports = router;
