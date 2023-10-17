import express from 'express';
import ListController from '../controllers/list.controller.js';

const router = express();

router.get('/page/new', ListController.getTopNewPage);
router.get('/dish/new', ListController.getTopNewDish);

export default router;
