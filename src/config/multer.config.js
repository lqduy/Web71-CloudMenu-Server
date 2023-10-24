import multer from 'multer';
import fs from 'fs';

// Kiểm tra xem folder uploads đã được tạo hay chưa
// Nếu chưa thì tạo
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // Chọn thư mục luu trữ tạm trên server
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Tạo unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${file.originalname}-${uniqueSuffix}.${fileExtension}`;
    cb(null, filename);
  }
});

export default multerConfig;
