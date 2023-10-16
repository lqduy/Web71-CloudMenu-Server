import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleFile = (filePath, folder = 'social-web-app-71') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: 'auto',
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
          throw new Error(error);
        } else {
          // Upload thành công lên cloudinary
          // Delete temp image ở trong folder uploads
          fs.unlinkSync(filePath);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
    );
  });
};

const CloudinaryService = { uploadSingleFile };
export default CloudinaryService;
