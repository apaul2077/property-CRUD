import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  sendRecommendation,
  getReceivedRecommendations,
  getSentRecommendations
} from '../controllers/recommendControllers.js'; 

const router = express.Router();


router.post('/', verifyToken, sendRecommendation);
router.get('/received', verifyToken, getReceivedRecommendations);
router.get('/sent', verifyToken, getSentRecommendations);

export default router;
