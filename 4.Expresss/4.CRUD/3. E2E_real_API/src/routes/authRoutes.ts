import express from 'express';
import { registerUser } from '../controllers/authController';
const router = express.Router();

// public Routess
router.post('/register',registerUser )

export default router;