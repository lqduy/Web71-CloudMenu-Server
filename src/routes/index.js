import express from 'express';
import mediaRouter from './media.route.js';
import authRouter from './auth.route.js';
import usersRouter from './user.route.js';
import pageRouter from './page.route.js';
import dishRouter from './dish.route.js';
import menuRouter from './menu.route.js';
import listRouter from './list.route.js';
import newsRouter from './news.route.js';

const router = express.Router();

router.use('/media', mediaRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/pages', pageRouter);
router.use('/dishes', dishRouter);
router.use('/menus', menuRouter);
router.use('/lists', listRouter);
router.use('/news', newsRouter);

export default router;
