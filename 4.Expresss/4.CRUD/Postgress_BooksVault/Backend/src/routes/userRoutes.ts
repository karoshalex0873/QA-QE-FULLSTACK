import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controllers/userController';

const router = express.Router();

// POST /register route to register a new user  
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get('/appUsers',getAllUsers)

export default router;