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
    .aggregate([
      { $match: { avatar: { $exists: true, $elemMatch: { $ne: null } } } },
      { $sort: { createdAt: -1 } },
      { $limit: +quantity }
    ])
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
    .aggregate([
      { $match: { images: { $exists: true, $elemMatch: { $ne: null } } } },
      { $sort: { createdAt: -1 } },
      { $limit: +quantity }
    ])
    .toArray();

  const dishIds = topNew.map(dish => new ObjectId(dish.pageId));
  const pageDataList = await db.pages.find({ _id: { $in: dishIds } }).toArray();

  const topNewMapping = topNew.map(dish => {
    const pageData = pageDataList.find(page => page._id.toString() === dish.pageId);
    return { ...dish, pageData };
  });

  res.json({ data: topNewMapping });
});

const ListController = { getTopNewPage, getTopNewDish };

export default ListController;
