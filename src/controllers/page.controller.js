import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const createPage = asyncHandler(async (req, res) => {
  const {
    brandName,
    businessType,
    isVegetarian,
    hasAlcoholic,
    orderWays,
    address,
    province,
    district,
    ward,
    phoneNumber,
    email
  } = req.body;

  const newPage = {
    ...req.body,
    createdAt: new Date()
  };
  await db.pages.insertOne(newPage);

  res.status(201).json({
    message: 'Created page successfully'
  });
});

const getALLPages = asyncHandler(async (req, res) => {
  try {
    const pages = await db.pages.find().toArray();

    res.json({
      data: pages
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getPageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingId = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingId) {
    return res.status(500).json({
      message: 'Page not found !'
    });
  }

  res.json(existingId);
});

const updatePage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const existingId = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingId) {
    return res.json({
      message: 'Page not found'
    });
  }

  await db.pages.updateOne(
    {
      _id: new ObjectId(id)
    },

    {
      $set: updatedFields
    }
  );

  return res.json({
    message: 'Update post successfully'
  });
});

const deletePage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingId = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingId) {
    return res.json({
      message: 'Page not found'
    });
  }

  await db.pages.deleteOne({ _id: new ObjectId(id) });
  return res.json({
    message: 'Delete successfully'
  });
});

const PageController = {
  createPage,
  getALLPages,
  getPageById,
  updatePage,
  deletePage
};

export default PageController;
