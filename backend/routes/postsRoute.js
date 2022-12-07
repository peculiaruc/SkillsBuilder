import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import PostController from '../controllers/postController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', PostController.createPost);

router.get('/:id', PostController.getPostById);

router.put('/:id', PostController.updatePost);

router.delete('/:id', PostController.deletePost);

module.exports = router;
