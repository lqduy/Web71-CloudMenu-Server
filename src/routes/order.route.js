import express from 'express';
import OrderController from '../controllers/order.controller.js';
import orderValidator from '../valdationSchema/order.validator.js';
import { validateMdw } from '../middlewares/validate.mdw.js';

const router = express();

router.post('/', validateMdw(orderValidator.createSchema), OrderController.createOrder);
router.get('/:pageId', OrderController.getAllOfPage);
router.put('/:id', validateMdw(orderValidator.createSchema), OrderController.update);

export default router;
