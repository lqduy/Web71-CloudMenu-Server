import express from 'express';
import { validateMdw } from '../middlewares/validate.mdw.js';
import pageValidator from '../valdationSchema/page.validator.js';
import PageController from '../controllers/page.controller.js';

const router = express.Router();

router.get('/user/:userId', PageController.getAllOfUser);
router.get('/:id', PageController.getPageById);
router.post('/', validateMdw(pageValidator.pageSchema), PageController.createPage);
router.delete('/:id', PageController.deletePage);
router.put('/:id', validateMdw(pageValidator.pageSchema), PageController.updatePage);
router.put('/:id/apply-menu', PageController.applyMenu);

export default router;
