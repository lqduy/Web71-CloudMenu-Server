import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';
import { ORDER_STATUS } from '../utils/constants.js';

const createOrder = asyncHandler(async (req, res) => {
  const { pageId } = req.body;
  const ordersOfPage = await db.orders.find({ pageId: pageId }).toArray();

  const newOrder = {
    ...req.body,
    orderIndex: ordersOfPage.length + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.orders.insertOne(newOrder);

  res.status(201).json({
    message: 'Created successfully'
  });
});

const getAllOfPage = asyncHandler(async (req, res) => {
  const { pageId } = req.params;
  const allOrder = await db.orders
    .find({ pageId: pageId })
    // .find({ pageId: pageId, status: { $ne: ORDER_STATUS.DONE } })
    .toArray();
  const sortedOrderList = allOrder.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  res.json({ data: sortedOrderList ?? [] });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const existingOrder = await db.orders.findOne({ _id: new ObjectId(id) });

  if (!existingOrder) {
    res.status(400);
    throw new Error('Order not found');
  }

  const { _id, createdAt, ...rest } = updateData;
  const updatedFields = { ...existingOrder, ...rest, updatedAt: new Date() };

  await db.orders.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

  res.json({ message: 'Update order successfully' });
});

const OrderController = {
  createOrder,
  getAllOfPage,
  update
};

export default OrderController;
