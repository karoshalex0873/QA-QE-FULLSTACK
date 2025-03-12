import express from 'express';
import { makeAdmin, makeLibrarian } from '../controllers/adminControllers';


const router = express.Router();

router.post('/makeAdmin',makeAdmin)
router.post('/makeLibrarian',makeLibrarian)

export default router