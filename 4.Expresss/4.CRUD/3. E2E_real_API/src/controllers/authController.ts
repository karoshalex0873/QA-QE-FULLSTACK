// regisster controller
import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import pool from "../config/db.config"
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/helpers/generateTokens";
export const registerUser = asyncHandler(
  async (req: Request, res: Response,next:NextFunction) => {
    const { name, email, password, role_id } = req.body
    //check if user is already registerd
    const userCheck = await pool.query("SELECT * FROM  users WHERE email = $1", [email])

    if (userCheck.rows.length > 0) {
      res.status(400).json({ message: "User aleady exists" })
      return
    }

    //Hash the user password using the bycryptjs algorithm
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // insert user into the database
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role_id",
      [name, email, hashedPassword, role_id]
    );
    

    //Generate JWT token
    generateToken(res,newUser.rows[0].id, newUser.rows[0].role_id)

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] })

    next()

  }
)