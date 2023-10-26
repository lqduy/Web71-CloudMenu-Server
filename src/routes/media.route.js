import express from 'express';
import MediaController from '../controllers/media.controller.js';
import uploadMdw from '../middlewares/upload.mdw.js';
import authMiddleware from '../middlewares/auth.mdw.js';

const router = express();

router.post('/images', authMiddleware, uploadMdw.single('image'), MediaController.uploadImage);

export default router;
