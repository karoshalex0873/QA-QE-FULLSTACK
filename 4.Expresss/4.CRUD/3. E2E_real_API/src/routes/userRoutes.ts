import express from 'express';
import { getUsers } from '../controllers/userControllers';
import { protect } from '../middlewares/auth/protect';

const router = express.Router();

// public Routess
router.get('/getAll',protect,getUsers)

export default router;