import express from 'express';
import filterController from '../controllers/filterController.js';

const router = express.Router();

router.get('/', filterController)

export default router;