import express from 'express';
import { addPost } from '../controllers/PostControllers';

const router= express.Router();

// post request of the users post
router.post('/addPost',addPost)

export default router