import { Request, Response } from "express";
import pool from "../config/db";

export const makeAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🔥 Full request body:", req.body);
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "Invalid user_id" });
      return;
    }

    // Get user's current role_name
    const user = await pool.query(
      "SELECT role_name FROM users WHERE user_id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const userRoleName = user.rows[0].role_name;

    // Allow only "Librarian" or "Borrower" to become Admin
    if (userRoleName !== "Librarian" && userRoleName !== "Borrower") {
      res.status(400).json({
        message: "Only Librarian or Borrower can be made Admin",
      });
      return;
    }

    // Update role_name in users table
    await pool.query(
      "UPDATE users SET role_name = 'Admin' WHERE user_id = $1",
      [userId]
    );

    res.status(200).json({ message: "User role updated successfully!" });

  } catch (error) {
    console.error("❌ Error making admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// function to make a  borrwer to librarian 
export const makeLibrarian = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("💪 full body request",req.body);
    const{userId}=req.body
    // check if user_id is provided
    if(!userId){
      res.status(400).json({ message: "Invalid user_id" });
      return;
    }
    // get user's current role_name
    const user= await pool.query(
      "SELECT role_name FROM users WHERE user_id = $1",
      [userId]
    );
    // if user not found
    if(user.rows.length===0){
      res.status(400).json({ message: "User not found" });
      return;
    }
    // check if user is already librarian
    const userRoleName=user.rows[0].role_name;
    if(userRoleName==="Librarian"){
      res.status(400).json({ message: "User is already a librarian" });
      return;
    }
    // update user's role_name in users table
    await pool.query(
      "UPDATE users SET role_name = 'Librarian' WHERE user_id = $1",
      [userId]
    );
  } catch (error) {
    console.error("error making librarian an Admin")
    res.status(500).json({ message: "Internal server error" });
  }
}