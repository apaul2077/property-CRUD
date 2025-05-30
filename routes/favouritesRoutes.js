import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/favouritesControllers.js';

const router = express.Router();

router
  .route('/')
  .get(verifyToken, getFavorites)
  .post(verifyToken, addFavorite);

router
  .route('/:propId')
  .delete(verifyToken, removeFavorite);

export default router;
