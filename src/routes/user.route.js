import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import uploadMdw from '../middlewares/upload.mdw.js';

const router = express();

router.put('/avatar', 
authMiddleware, 
uploadMdw.single('image'), 
UserController.uploadAvatar);

router.put('/profile', UserController.updateProfile);
router.get('/:id', UserController.getOne);
router.put('/:id', UserController.update);

export default router;
