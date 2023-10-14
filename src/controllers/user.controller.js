import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    return res.status(400).json({ message: 'User not found' });
  }

  res.json({ data: existingUser });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await db.users.findOne({ _id: new ObjectId(id) });

  if (!existingUser) {
    return res.status(400).json({ message: 'User not found' });
  }

  const { _id, email, ...rest } = req.body;

  const updatedData = {
    ...existingUser,
    ...rest,
    updateAt: new Date()
  };
  await db.users.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

  res.json({ message: 'Update dish successfully' });
});

const UserController = {
  getOne,
  update
};

export default UserController;
