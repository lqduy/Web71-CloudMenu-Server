import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getAll = asyncHandler(async (_, res) => {
  const dishes = await db.dishes.find().toArray();
  res.json({ data: dishes });
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
  getAll,
  create,
  update,
  deleteOne
};

export default DishController;
