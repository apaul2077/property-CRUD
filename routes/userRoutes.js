import express from 'express';
import { login, registerUser, logoutUser } from '../controllers/userControllers.js'

const router = express.Router();

router.post('/register', registerUser );
router.post('/login', login);
router.get('/logout', logoutUser);

export default router;