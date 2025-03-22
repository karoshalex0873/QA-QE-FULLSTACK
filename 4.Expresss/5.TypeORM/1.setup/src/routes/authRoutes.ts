import express from "express";
import { registerUser } from "../controllers/AuthControllers";



const router = express.Router();

// Route definition
router.post("/register",registerUser)

export default router;
