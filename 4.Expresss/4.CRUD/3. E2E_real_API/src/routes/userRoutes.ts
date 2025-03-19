import express from 'express';
import { getUserName, getUserRole, getUsers } from '../controllers/userControllers';
import { protect } from '../middlewares/auth/protect';

const router = express.Router();

// public Routess
router.get('/getAll',protect,getUsers)
router.get('/user-role',protect,getUserRole)
router.get('/user-name',protect,getUserName)

export default router;