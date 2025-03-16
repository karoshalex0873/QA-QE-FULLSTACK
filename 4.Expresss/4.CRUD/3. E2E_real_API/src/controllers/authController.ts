// regisster controller
import { NextFunction, Request, Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import pool from "../config/db.config"
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/helpers/generateTokens";
import { UserRequest } from "../../utils/types/userTypes";

export const registerUser = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
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
    generateToken(res, newUser.rows[0].id, newUser.rows[0].role_id)

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] })

    next()

  }
)


export const loginUser = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const { email, password } = req.body;
    // Check if user exists
    const userCheck = await pool.query(`
      SELECT users.user_id, users.name, users.email, users.password_hash, users.role_id, user_role.role_name 
      FROM users 
      JOIN user_role ON users.role_id = user_role.role_id 
      WHERE users.email = $1
    `, [email]);

    if (userCheck.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userCheck.rows[0];

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    generateToken(res, user.user_id, user.role_id);

    res.status(200).json({
      message: "✔ User logged in successfully",
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role_name
      }
    });
  }
);

//Logout function 

export const logoutUser = asyncHandler(
    async (req:UserRequest, res:Response,next:NextFunction) => {
      res.cookie("access_token"," ",{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:"strict",
        expires:new Date(0) 
      });

      res.cookie("refreshToken"," ",{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:"strict",
        expires:new Date(0) 
      });
      res.status(200).json({ message: "User logged out successfully" });
    }
)
