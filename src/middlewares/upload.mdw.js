import multer from 'multer';
import multerConfig from '../config/multer.config.js';

const uploadMdw = multer({
  storage: multerConfig,
});

export default uploadMdw;




