import express from 'express';
import {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById
} from '../controllers/propertyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(verifyToken, createProperty)
  .get(getAllProperties);

router.route('/:id')
  .get(getPropertyById)
  .put(verifyToken, updateProperty)
  .delete(verifyToken, deleteProperty);

export default router;
