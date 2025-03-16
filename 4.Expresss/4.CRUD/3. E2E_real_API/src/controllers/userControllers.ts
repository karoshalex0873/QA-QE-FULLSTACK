import { Request,Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";

export  const getUsers  = asyncHandler(
  async(req:UserRequest,res:Response) => {
  // only admin can get all users 
  const result = await pool.query("SELECT * FROM users ORDER BY user_id DESC");
  res.status(200).json(result.rows)
  }
)