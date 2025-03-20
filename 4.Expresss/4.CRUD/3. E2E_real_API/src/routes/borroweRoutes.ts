import { BorrowBook } from '@app/controllers/borrowersController';
import { protect } from '@app/middlewares/auth/protect';
import { allusersGuard } from '@app/middlewares/auth/roleMiddleware';
import express from 'express';



const router = express.Router();

router.post('/borrow',protect,allusersGuard,BorrowBook)

export default router;