import express from 'express';
import { verifyToken } from '../middlewares/authCheck';
import MaterialsController from '../controllers/materialsController';

const router = express.Router();

router.use(verifyToken);

router.post('/create', MaterialsController.createCourseMaterial);

router.get('/:id', MaterialsController.getMaterialById);

router.put('/:id', MaterialsController.updateMaterial);

router.delete('/:id', MaterialsController.deleteMaterial);

module.exports = router;
