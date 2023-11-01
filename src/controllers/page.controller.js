import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const createPage = asyncHandler(async (req, res) => {
  const { userId, name, businessType } = req.body;

  const existingUser = await db.users.findOne({ _id: new ObjectId(userId) });
  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const newPage = {
    _id: new ObjectId(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    activeMenuId: null
  };
  await db.pages.insertOne(newPage);
  await db.users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...existingUser, activePageId: newPage._id, updatedAt: new Date() } }
  );

  await db.news.insertOne({
    time: new Date(),
    type: 'create page',
    action: `bắt đầu kinh doanh`,
    object: `${businessType} - ${name}`,
    objectId: newPage._id,
    madeBy: `${existingUser.firstName} ${existingUser.lastName}`,
    pageId: newPage._id
  });

  res.status(201).json({
    message: 'Created page successfully'
  });
});

const getAllOfUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const existingUser = await db.users.findOne({ _id: new ObjectId(userId) });

  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const pages = await db.pages.find({ userId: userId }).toArray();

  res.json({ data: pages ?? [] });
});

const getPageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const users = await db.users.find().toArray();
  const likes = users.filter(user => Array.isArray(user.likes) && user.likes.includes(id)).length;

  const pageData = { ...existingPage, likes };

  res.json(pageData);
});

const updatePage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }
  const { _id, ...rest } = req.body;

  const updatedFields = { ...existingPage, ...rest, updatedAt: new Date() };
  console.log(updatedFields);
  await db.pages.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

  res.json({
    message: 'Update page successfully'
  });
});

const deletePage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(id) });

  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const existingUser = await db.users.findOne({ _id: new ObjectId(existingPage.userId) });
  const isMatchedPassword = await bcrypt.compare(password, existingUser.password);

  if (!isMatchedPassword) {
    res.status(400);
    throw new Error('Mật khẩu không đúng');
  }

  await db.pages.deleteOne({ _id: new ObjectId(id) });
  await db.menus.deleteMany({ pageId: new ObjectId(id) });
  await db.dishes.deleteMany({ pageId: new ObjectId(id) });

  return res.json({
    message: 'Delete successfully'
  });
});

const applyMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { menuId } = req.body;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(id) });
  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  const existingMenu = await db.menus.findOne({ _id: new ObjectId(menuId) });
  if (!existingMenu) {
    res.status(400);
    throw new Error('Menu not found');
  }

  const newPageData = { ...existingPage, activeMenuId: menuId, updatedAt: new Date() };
  await db.pages.updateOne({ _id: new ObjectId(id) }, { $set: newPageData });

  await db.news.insertOne({
    time: new Date(),
    type: 'apply menu',
    action: `áp dụng thực đơn ${existingMenu.dishQuantity} món`,
    object: `${existingMenu.name}`,
    objectId: existingMenu._id,
    madeBy: `${existingPage.businessType} ${existingPage.name}`,
    pageId: id
  });

  res.json({
    message: 'Menu is applied'
  });
});

const unApplyMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPage = await db.pages.findOne({ _id: new ObjectId(id) });
  if (!existingPage) {
    res.status(400);
    throw new Error('Page not found');
  }

  await db.pages.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...existingPage, activeMenuId: null, updatedAt: new Date() } }
  );

  res.json({
    message: 'Menu is un-applied'
  });
});

const PageController = {
  createPage,
  getAllOfUser,
  getPageById,
  updatePage,
  deletePage,
  applyMenu,
  unApplyMenu
};

export default PageController;
