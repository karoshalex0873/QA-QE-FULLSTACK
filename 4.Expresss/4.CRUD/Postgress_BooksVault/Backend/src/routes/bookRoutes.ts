import express from  'express';
import { addBook, filterBooks, getAllBooks,getSingleBook} from '../controllers/booksController';

const router= express.Router();

// get all book controllers
router.post('/add',addBook)
router.get('/get',getAllBooks)
router.get('/get/:bookId',getSingleBook)
router.get('/filter',filterBooks)

export default router;