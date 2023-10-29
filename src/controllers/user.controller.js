import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

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

  const { _id, email, ...rest } = req.body;

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

const UserController = {
  getOne,
  update,
  getLikes
};

export default UserController;
