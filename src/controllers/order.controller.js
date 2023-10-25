import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.order.insertOne(newOrder);

  res.status(201).json({
    message: 'Created successfully'
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const allOrder = await db.order.find().toArray();
  const sortedDishList = order.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  res.json({ data: sortedDishList ?? [] });
});

const OrderComtroller = {
  getAllOrder,
  createOrder
};

export default OrderComtroller;
