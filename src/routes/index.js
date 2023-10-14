import express from 'express';
import authRouter from './auth.route.js';
import usersRouter from './user.route.js';
import pageRouter from './page.route.js';
import dishRouter from './dish.route.js';
import menuRouter from './menu.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/pages', pageRouter);
router.use('/dishes', dishRouter);
router.use('/menus', menuRouter);

export default router;
