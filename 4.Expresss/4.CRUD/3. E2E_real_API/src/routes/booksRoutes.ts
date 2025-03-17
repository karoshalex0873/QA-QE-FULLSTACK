import express from 'express';
import { protect } from '../middlewares/auth/protect';
import { addBooks, deleteBooks, getAllBooks, updateBook } from '../controllers/booksController';
import { adminOrLibrarianGuard, allusersGuard } from '../middlewares/auth/roleMiddleware';
;

const router = express.Router();

// public Routes
// 1 .add book
router.post('/add', protect,adminOrLibrarianGuard , addBooks)
// 2. get all books
router.get('/get',protect,allusersGuard,getAllBooks)
// 3. update a book
router.put('/update/:book_id',protect,adminOrLibrarianGuard,updateBook)
// 4. delete a book
router.delete('/delete/:book_id',protect,adminOrLibrarianGuard,deleteBooks)
export default router;