import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';
import CloudinaryService from '../services/cloudinary.service.js';

const uploadImage = asyncHandler(async (req, res) => {
  // 1. Get file from request object
  console.log(req.user);
  const file = req.file;
  const user = req.user;

  // 2. Upload file from server to Cloudinary
  const { url } = await CloudinaryService.uploadSingleFile(file.path);

  if (!url) {
    res.status(400);
    throw new Error('Upload failed');
  }

  // 3. Update image to mongodb
  await db.media.insertOne({ url, user });

  res.json({
    message: 'Upload image successfully',
    userId: user.id,
    url
  });
});

const MediaController = {
  uploadImage
};

export default MediaController;
