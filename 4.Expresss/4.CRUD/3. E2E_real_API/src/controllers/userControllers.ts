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

//endpoint to get user roles
export const getUserRole = asyncHandler(
  async(req:UserRequest,res:Response) => {
    if(!req.user){
      return res.status(401).json({message: "Access denied"});
    }
    // get user role
    const result = await pool.query("SELECT role_id FROM users WHERE user_id = $1", [req.user.user_id] )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0].role_id)

  }
)

//endpoint to get user name
export const getUserName =asyncHandler(
  async (req:UserRequest,res:Response) => {
    if(!req.user){
      return res.status(401).json({message: "Access denied"});
    }
    // get user name
    const result = await pool.query("SELECT name FROM users WHERE user_id = $1", [req.user.user_id] )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result.rows[0].name)
  }
)