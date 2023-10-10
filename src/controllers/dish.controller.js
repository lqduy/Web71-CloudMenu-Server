import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const createDish = asyncHandler(async (req, res) => {
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

const updateDish = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const existingDish = await db.dishes.findOne({ _id: new ObjectId(id) });

  if (!existingDish) {
    return res.status(400).json({
      message: 'Dish not found'
    });
  }

  const { _id, createdAt, ...rest } = updateData;
  const updatedFields = { ...existingDish, ...rest, updatedAt: new Date() };

  await db.dishes.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

  res.json({ message: 'Update post successfully' });
});

const DishController = {
  createDish,
  updateDish
};

export default DishController;
