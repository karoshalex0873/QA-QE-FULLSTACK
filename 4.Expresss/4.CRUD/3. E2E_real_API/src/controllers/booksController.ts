import { query, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";
import { BookRequest } from "../../utils/types/bookTypes";

export const addBooks = asyncHandler(async (req: UserRequest, res: Response) => {
  try {
    // Extract user_id from the authenticated user's token
    if (!req.user) {
      return res.status(401).json({ message: "Access denied" });
    }
    const userId = req.user.user_id;

    // Books body destructuring
    const { title, author, genre, year, pages, publisher, description, image, pdf, copies = 1 } = req.body;

    // Ensure only a Librarian or Admin can add a book
    if (req.user.role_name !== "Admin" && req.user.role_name !== "Librarian") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // **Step 1: Check if the book already exists**
    const existingBook = await pool.query(
      "SELECT book_id, copies FROM books WHERE title = $1 AND author = $2 AND year = $3",
      [title, author, year]
    );

    let bookId;

    if (existingBook.rows.length > 0) {
      // **Step 2: Update the existing book's copies count**
      bookId = existingBook.rows[0].book_id;
      const updatedCopies = existingBook.rows[0].copies + Number(copies);

      await pool.query(
        "UPDATE books SET copies = $1, updated_at = CURRENT_TIMESTAMP WHERE book_id = $2",
        [updatedCopies, bookId]
      );

    } else {
      // **Step 3: Insert new book into database**
      const newBook = await pool.query(
        "INSERT INTO books (title, author, genre, year, pages, publisher, description, image, user_id, pdf, copies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [title, author, genre, year, pages, publisher, description, image, userId, pdf, copies]
      );

      bookId = newBook.rows[0].book_id;
    }

    // **Step 4: Insert book copies**
    const copyInsertQueries = [];
    for (let i = 0; i < Number(copies); i++) {
      copyInsertQueries.push(
        pool.query(
          "INSERT INTO book_copies (book_id, inventory_number, condition, status, location) VALUES ($1, $2, $3, $4, $5)",
          [bookId, `INV-${bookId}-${i + 1}`, "New", "Available", "Library Shelf"]
        )
      );
    }

    await Promise.all(copyInsertQueries);

    res.status(201).json({ message: "Book added successfully or copies updated", bookId });
  } catch (error) {
    console.error("Error while adding books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//delete books 
export const deleteBooks = asyncHandler(async (req: BookRequest, res: Response) => {
  const { book_id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Check if the book exists
  const queryBook = await pool.query("SELECT user_id FROM books WHERE book_id = $1", [book_id]);

  if (queryBook.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user is Admin to delete the book
  if (queryBook.rows[0].user_id !== req.user.user_id && req.user.role_name !== "Admin") {
    return res.status(403).json({ message: "Not authorized to delete this book" });
  }

  // First, delete all book copies related to the book
  await pool.query("DELETE FROM book_copies WHERE book_id = $1", [book_id]);

  // Then, delete the book itself
  await pool.query("DELETE FROM books WHERE book_id = $1", [book_id]);

  res.status(200).json({ message: "Book and its copies deleted successfully" });
});


export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await pool.query("SELECT * FROM books");

  res.status(200).json({ books: books.rows });
});

export const updateBook = asyncHandler(async (req: BookRequest, res: Response) => {
  const { book_id } = req.params;
  const { title, author, genre, year, pages, publisher, description, image, pdf, copies } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Check if the book exists
  const queryBook = await pool.query("SELECT user_id, copies FROM books WHERE book_id = $1", [book_id]);

  if (queryBook.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user is authorized to update
  if (queryBook.rows[0].user_id !== req.user.user_id && req.user.role_name !== "Admin" && req.user.role_name !== "Librarian") {
    return res.status(403).json({ message: "Not authorized to update this book" });
  }

  // If the copies field is updated, adjust the book_copies table accordingly
  if (copies !== undefined) {
    const existingCopies = queryBook.rows[0].copies;
    const difference = copies - existingCopies;

    if (difference > 0) {
      // Add new copies
      const copyInsertQueries = [];
      for (let i = 0; i < difference; i++) {
        copyInsertQueries.push(
          pool.query(
            "INSERT INTO book_copies (book_id, inventory_number, condition, status, location) VALUES ($1, $2, $3, $4, $5)",
            [book_id, `INV-${book_id}-${existingCopies + i + 1}`, "New", "Available", "Library Shelf"]
          )
        );
      }
      await Promise.all(copyInsertQueries);
    } else if (difference < 0) {
      // Remove extra copies (delete the latest added ones)
      await pool.query(
        "DELETE FROM book_copies WHERE book_id = $1 ORDER BY inventory_number DESC LIMIT $2",
        [book_id, Math.abs(difference)]
      );
    }
  }

  // Update book details
  const updatedBook = await pool.query(
    `UPDATE books SET 
      title = COALESCE($1, title), 
      author = COALESCE($2, author), 
      genre = COALESCE($3, genre), 
      year = COALESCE($4, year), 
      pages = COALESCE($5, pages), 
      publisher = COALESCE($6, publisher), 
      description = COALESCE($7, description), 
      image = COALESCE($8, image), 
      pdf = COALESCE($9, pdf),
      copies = COALESCE($10, copies)
    WHERE book_id = $11 RETURNING *`,
    [title, author, genre, year, pages, publisher, description, image, pdf, copies, book_id]
  );

  res.status(200).json({ message: "Book updated successfully", book: updatedBook.rows });
});
