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

const UserController = {
  getOne,
  update
};

export default UserController;
