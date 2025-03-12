import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';

const router = express.Router();

// POST /register route to register a new user  
router.post("/register",registerUser)
router.post("/login",loginUser)

export default router;