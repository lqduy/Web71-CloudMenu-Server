import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getAllOfPage = asyncHandler(async (req, res) => {
  const { pageId } = req.params;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(pageId) });

  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const menus = await db.menus.find({ pageId: pageId }).toArray();
  const sortedMenuList = menus.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  res.json({ data: sortedMenuList ?? [] });
});

const getOne = asyncHandler(async (req, res) => {
  const id = req.params;

  const existingMenu = await db.menus.findOne({ _id: new ObjectId(id) });

  if (!existingMenu) {
    res.status(400);
    throw new Error('Menu not found');
  }

  res.json({ data: existingMenu });
});

const create = asyncHandler(async (req, res) => {
  const { pageId } = req.body;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(pageId) });
  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const newMenu = {
    _id: new ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...req.body
  };

  await db.menus.insertOne(newMenu);

  res.status(201).json({
    message: 'Created successfully',
    createdMenuId: newMenu._id
  });
});

const MenuController = {
  getAllOfPage,
  getOne,
  create
};

export default MenuController;
