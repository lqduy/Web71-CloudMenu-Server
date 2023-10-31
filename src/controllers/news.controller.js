import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getNewest = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const quantity = +q ?? 10;
  let news = await db.news
    .aggregate([{ $sort: { time: -1 } }])
    .limit(quantity)
    .toArray();

  news = await Promise.all(
    news.map(async item => {
      const pageData = await db.pages.findOne({ _id: new ObjectId(item.pageId) });
      const mappingItem = pageData ? { ...item, pageData } : item;
      console.log(mappingItem);
      return mappingItem;
    })
  );

  res.json({ data: news });
});

const NewsController = {
  getNewest
};

export default NewsController;
