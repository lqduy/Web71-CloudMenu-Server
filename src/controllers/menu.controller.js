import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getAll = asyncHandler(async (_, res) => {
  const menus = await db.menus.find().toArray();
  res.json({ data: menus });
});

const getOne = asyncHandler(async (req, res) => {
  const id = req.params;

  const existingMenu = await db.menus.findOne({ _id: new ObjectId(id) });

  if (!existingMenu) {
    return res.status(400).json({ message: 'Not found menu' });
  }

  res.json({ data: existingMenu });
});

const create = asyncHandler(async (req, res) => {
  const newMenu = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.menus.insertOne(newMenu);

  res.status(201).json({
    message: 'Created successfully'
  });
});

const MenuController = {
  getAll,
  getOne,
  create
};

export default MenuController;
