import express from 'express';
import MenuController from '../controllers/menu.controller.js';
import menuValidator from '../valdationSchema/menu.validator.js';
import { validateMdw } from '../middlewares/validate.mdw.js';

const router = express.Router();

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getOne);
router.post('/', MenuController.create);

export default router;




