import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"


// User registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = "Borrower" } = req.body; // Default to 'Borrower'

    // Check if email already exists
    const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Validate role_name
    const roleCheck = await pool.query("SELECT role_name FROM user_roles WHERE role_name = $1", [role]);
    if (roleCheck.rows.length === 0) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user with role_name
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role]
    );
    res.status(200).json({ message: "✔ User registered successfully!", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length === 0) {
      res.status(400).json({ message: "User not found" });
      return
    }

    const user = checkUser.rows[0];

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid password" });
      return
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "✔ Login successful",
      token,
      user: { id: user.user_id, name: user.name, email: user.email ,role:user.role_name}
    });
  } catch (error) {
    console.error("Error logging in the user:", error);
    res.status(500).send("Internal Server Error");
  }
};


// get all users
export const getAllUsers = asyncHandler(async (req:Request, res:Response) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);  // return all users
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})
