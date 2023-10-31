import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  res.json({ data: existingUser });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const { _id, ...rest } = req.body;

  const updatedData = {
    ...existingUser,
    ...rest,
    updatedAt: new Date()
  };
  await db.users.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

  res.json({ message: 'Update dish successfully' });
});

const getLikes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const users = await db.users.find().toArray();

  let results = [];
  if (Array.isArray(existingUser.likes)) {
    results = await db.pages
      .find({ _id: { $in: existingUser.likes.map(like => new ObjectId(like)) } })
      .toArray();

    results = results.map(page => {
      const likes = users.filter(
        user => Array.isArray(user.likes) && user.likes.includes(page._id.toString())
      ).length;
      return { ...page, likes };
    });
  }

  res.json({ data: results });
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, password } = req.body || {};

  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const isMatchedPassword = await bcrypt.compare(oldPassword, existingUser.password);

  if (!isMatchedPassword) {
    res.status(400);
    throw new Error('Wrong password ');
  }

  if (newPassword !== password) {
    res.status(400);
    throw new Error('Mật khẩu mới không khớp');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const update = { password: hashedPassword };
  await db.users.updateOne({ _id: new ObjectId(id) }, { $set: update });
  res.json({ message: 'Update password successfully' });
});

const UserController = {
  getOne,
  update,
  getLikes,
  changePassword
};

export default UserController;
