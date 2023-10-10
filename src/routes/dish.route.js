import express from 'express';
import DishController from '../controllers/dish.controller.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import dishValidator from '../valdationSchema/dish.validator.js';

const router = express();

router.post('/', validateMdw(dishValidator.createSchema), DishController.createDish);
router.put('/:id', validateMdw(dishValidator.createSchema), DishController.updateDish);

export default router;
