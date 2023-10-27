import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';
import CloudinaryService from '../services/cloudinary.service.js';

const getAllOfPage = asyncHandler(async (req, res) => {
  const { pageId } = req.params;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(pageId) });

  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const dishes = await db.dishes.find({ pageId: pageId }).toArray();
  const sortedDishList = dishes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  res.json({ data: sortedDishList ?? [] });
});

const create = asyncHandler(async (req, res) => {
  const newDish = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.dishes.insertOne(newDish);

  res.status(201).json({
    message: 'Created successfully'
  });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const existingDish = await db.dishes.findOne({ _id: new ObjectId(id) });

  if (!existingDish) {
    res.status(400);
    throw new Error('Dish not found');
  }

  const { _id, createdAt, ...rest } = updateData;
  const updatedFields = { ...existingDish, ...rest, updatedAt: new Date() };

  await db.dishes.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

  res.json({ message: 'Update dish successfully' });
});

const deleteOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingDish = await db.dishes.findOne({ _id: new ObjectId(id) });

  if (!existingDish) {
    res.status(400);
    throw new Error('Dish not found');
  }

  await db.dishes.deleteOne({ _id: new ObjectId(id) });

  res.json({ message: 'Delete dish successfully' });
});

const DishController = {
  getAllOfPage,
  create,
  update,
  deleteOne
};

export default DishController;
