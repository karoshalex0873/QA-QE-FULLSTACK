import express from 'express';
import { protect } from '../middlewares/auth/protect';
import { addBooks } from '../controllers/booksController';
import { adminOrLibrarianGuard } from '../middlewares/auth/roleMiddleware';
;

const router = express.Router();

// public Routess
router.post('/add', protect,adminOrLibrarianGuard , addBooks)

export default router;