import express from 'express';
import { updateUserRole } from '../controllers/adminControllers';


const router = express.Router();

router.put('/updateRole/:userId',updateUserRole)


export default router