import { Response } from "express";
import { BorrowerRequest } from "utils/types/borrowerTypes";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "@app/config/db.config";
import { UserRequest } from "utils/types/userTypes";


export const BorrowBook = asyncHandler(
  async (req: UserRequest, res:Response) => {

    if(!req.user) {
      return res.status(401).json({ message: "Access denied" });
    }
    // Destructure the request bod
    const { user_id, copy_id, librarian_id, borrow_date, return_date, status } = req.body;

    const userId= req.user.user_id; // Get user_id from the authenticated user's token

    const librarianId=req.user.role_id
    
    // security
    if(req.user.role_name !== "Admin" && req.user.role_name !== "Librarian" && req.user.role_name !== "Borrower"){
      return res.status(403).json({ message: "Forbidden" });
    }
    //check if the book exists
    const bookCopy = await pool.query(
      "SELECT * FROM book_copies WHERE copy_id = $1", // Change 'id' to 'copy_id'
      [copy_id]
    );
    
    if (bookCopy.rows.length === 0) {
      return res.status(404).json({ message: "Book copy not found" });
    }
    // Check if the book is available
    if (bookCopy.rows[0].status !== "Available") {
      return res.status(400).json({ message: "Book copy is not available" });
    }
    // Check if the user has borrowed any books already
    const existingBorrower = await pool.query(
      "SELECT * FROM borrowers WHERE user_id = $1 AND status = 'Borrowed'",
      [userId]
    );
    if (existingBorrower.rows.length > 0) {
      return res.status(400).json({ message: "User has already borrowed a book" });
    }
    // Insert the borrower record into the database
    const newBorrower = await pool.query(
      "INSERT INTO borrowers (user_id, copy_id, librarian_id, borrow_date, return_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, copy_id, librarianId, borrow_date, return_date, status]
    );
    // Update the book copy status to "Borrowed"
    await pool.query(
      "UPDATE book_copies SET status = 'Borrowed' WHERE id = $1",
      [copy_id]
    );
    // Return the newly created borrower record
    return res.status(201).json(newBorrower.rows[0]);
  }
);

// function to return a book

export const ReturnBook = asyncHandler(
  async (req: UserRequest, res: Response) => {
    if(!req.user) {
      return res.status(401).json({ message: "Access denied" });
    }
    const { user_id, copy_id } = req.body;
    const userId= req.user.user_id; // Get user_id from the authenticated user's token
    const librarianId=req.user.role_id
    // security
    if(req.user.role_name !== "Admin" && req.user.role_name !== "Librarian" && req.user.role_name !== "Borrower"){
      return res.status(403).json({ message: "Forbidden" });
    }
    // Check if the book copy exists
    const bookCopy = await pool.query(
      "SELECT * FROM book_copies WHERE copy_id = $1",
      [copy_id]
    );
    if (bookCopy.rows.length === 0) {
      return res.status(404).json({ message: "Book copy not found" });
    }
    // Check if the book is already borrowed
    if (bookCopy.rows[0].status !== "Borrowed") {
      return res.status(400).json({ message: "Book copy is not borrowed" });
    }
    // Check if the user has borrowed the book
    const existingBorrower = await pool.query(
      "SELECT * FROM borrowers WHERE user_id = $1 AND copy_id = $2 AND status = 'Borrowed'",
      [userId, copy_id]
    );
    if (existingBorrower.rows.length === 0) {
      return res.status(400).json({ message: "User has not borrowed this book" });
    }
    // Update the book copy status to "Available"
    await pool.query(
      "UPDATE book_copies SET status = 'Available' WHERE copy_id = $1",
      [copy_id]
    );
    // Update the borrower record status to "Returned"
    await pool.query(
      "UPDATE borrowers SET status = 'Returned' WHERE user_id = $1 AND copy_id = $2",
      [userId, copy_id]
    );
    // Return a success message
    return res.status(200).json({ message: "Book returned successfully" });
})
