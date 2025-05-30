import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import Property from '../models/propertyModel.js';

export const getFavorites = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const favorites = await Property.find({ id: { $in: user.favorites } });
  res.json(favorites);
});


export const addFavorite = asyncHandler(async (req, res) => {
  const { propertyId } = req.body;
  if (!propertyId) {
    res.status(400);
    throw new Error('propertyId is required');
  }

  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.favorites.includes(propertyId)) {
    return res.status(400).json({ message: 'Already in favorites' });
  }

  user.favorites.push(propertyId);
  await user.save();

  res.status(201).json({ message: 'Added to favorites', favorites: user.favorites });
});


export const removeFavorite = asyncHandler(async (req, res) => {
  const { propId } = req.params;

  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.favorites = user.favorites.filter(id => id !== propId);
  await user.save();

  res.json({ message: 'Removed from favorites', favorites: user.favorites });
});
