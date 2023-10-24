import express from 'express';
import DishController from '../controllers/dish.controller.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import dishValidator from '../valdationSchema/dish.validator.js';
import uploadMdw from '../middlewares/upload.mdw.js';

const router = express();

router.get('/page/:pageId', DishController.getAllOfPage);
router.post('/', validateMdw(dishValidator.dishSchema), DishController.create);
router.put('/:id', validateMdw(dishValidator.dishSchema), DishController.update);
router.delete('/:id', DishController.deleteOne);
router.put('/:id/images', uploadMdw.single('image'), DishController.uploadImage);

export default router;
