import express from 'express';
import OrderComtroller from '../controllers/order.controller.js';

const router = express();

router.post('/', OrderComtroller.createOrder);
router.get('/', OrderComtroller.createOrder);

export default router;
