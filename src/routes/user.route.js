import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import authMiddleware from '../middlewares/auth.mdw.js';

const router = express();

router.get('/:id', UserController.getOne);
router.put('/:id', authMiddleware, UserController.update);
router.get('/:id/likes', authMiddleware, UserController.getLikes);
router.put('/:id/changePassword', authMiddleware, UserController.changePassword);

export default router;
