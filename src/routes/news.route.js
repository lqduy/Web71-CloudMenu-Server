import express from 'express';
import NewsController from '../controllers/news.controller.js';

const router = express();

router.get('/', NewsController.getNewest);

export default router;
