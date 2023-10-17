import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getTopNewPage = asyncHandler(async (req, res) => {
  const { q: quantity } = req.query;

  if (isNaN(+quantity)) {
    res.status(400);
    throw new Error('Invalid request');
  }

  const topNew = await db.pages
    .aggregate([{ $sort: { createdAt: -1 } }])
    .limit(+quantity)
    .toArray();

  res.json({ data: topNew });
});

const getTopNewDish = asyncHandler(async (req, res) => {
  const { q: quantity } = req.query;

  if (isNaN(+quantity)) {
    res.status(400);
    throw new Error('Invalid request');
  }

  const topNew = await db.dishes
    .aggregate([{ $sort: { createdAt: -1 } }])
    .limit(+quantity)
    .toArray();

  res.json({ data: topNew });
});

const ListController = { getTopNewPage, getTopNewDish };

export default ListController;
