import express from 'express';
import { login, registerUser, logoutUser } from '../controllers/userControllers.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', registerUser );
router.post('/auth/login', login);
router.get('/auth/logout', logoutUser);
// router.route('/profile').get(verifyToken, getProfile).put(verifyToken, updateProfile);

export default router;