import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getNewest = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const quantity = +q ?? 10;
  const news = await db.news
    .aggregate([{ $sort: { time: -1 } }])
    .limit(quantity)
    .toArray();
  res.json({ data: news });
});

const NewsController = {
  getNewest
};

export default NewsController;
