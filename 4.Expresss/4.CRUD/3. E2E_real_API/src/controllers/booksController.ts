import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";

export const addBooks = asyncHandler(async (req: UserRequest, res: Response) => {
  try {
    // Extract user_id from the authenticated user's token
    if (!req.user) {
      return res.status(401).json({ message: "Access denied" });
    }
    const userId = req.user.user_id;

    // Books body destructuring
    const { title, author, genre, year, pages, publisher, description, image, pdf } = req.body;

    // Ensure only a Librarian or Admin can add a book
    if (req.user.role_name !== "Admin" && req.user.role_name !== "Librarian") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Insert new book into database
    const newBook = await pool.query(
      "INSERT INTO books (title, author, genre, year, pages, publisher, description, image, user_id, pdf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [title, author, genre, year, pages, publisher, description, image, userId, pdf] // Only 10 values
    );

    res.status(201).json({ message: "Book added successfully", book: newBook.rows });
  } catch (error) {
    console.error("Error while adding books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
