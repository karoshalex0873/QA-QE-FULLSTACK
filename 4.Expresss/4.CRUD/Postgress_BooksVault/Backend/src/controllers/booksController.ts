// Imports
import { Request, Response } from "express";
import pool from "../config/db";
import asyncHandler from "express-async-handler"

// Function to add a new book to the database
export const addBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookID, title, author, genre, year, pages, publisher, price, description, image, pdf, user_id } = req.body;

        // Validate required inputs
        if (!bookID || !title || !author || !genre || !year || !user_id) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        // Check if the user is an Admin
        const adminCheck = await pool.query("SELECT role_name FROM users WHERE user_id = $1", [user_id]);
        if (adminCheck.rows.length === 0 || adminCheck.rows[0].role_name !== "Admin") {
            res.status(403).json({ message: "You are not authorized to add books" });
            return;
        }

        // Validate if book ID already exists
        const checkBookID = await pool.query("SELECT bookid FROM books WHERE bookid = $1", [bookID]);
        if (checkBookID.rows.length > 0) {
            res.status(400).json({ message: "Book ID already exists" });
            return;
        }

        // Insert new book
        const newBook = await pool.query(
            "INSERT INTO books (bookid, title, author, genre, year, pages, publisher, price, description, image, pdf, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [bookID, title, author, genre, year, pages, publisher, price, description, image, pdf, user_id]
        );

        // Respond with the new book
        res.status(201).json({ message: "📚 Book added successfully!", book: newBook.rows[0] });
    } catch (error) {
        console.error("❌ Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to get all books from the database
export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
    try {
        const books = await pool.query("SELECT * FROM books");
        res.json(books.rows);
    } catch (error) {
        console.error("Error getting books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const books = await pool.query("SELECT * FROM books");
//         res.json(books.rows);
//     } catch (error) {
//         console.error("�� Error getting books:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// Function to get a single book from the database 
export const getSingleBook = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Request received:", req.params);
        const { bookId } = req.params;
        console.log("Received bookID:", bookId); // Debugging line

        const book = await pool.query("SELECT * FROM books WHERE bookid = $1", [bookId]);

        if (book.rows.length === 0) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.json(book.rows[0]);
    } catch (error) {
        console.error("Error getting book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteBooks = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { bookid } = req.params;
        const { user_id } = req.body; // Extract user_id from request body

        if (!bookid) {
            res.status(400).json({ message: "Book ID is required" });
            return;
        }

        if (!user_id) {
            res.status(401).json({ message: "Unauthorized: User ID is required" });
            return;
        }

        // Check if the user is an admin
        const adminCheck = await pool.query("SELECT role_name FROM users WHERE user_id = $1", [user_id]);
        if (adminCheck.rows.length === 0 || adminCheck.rows[0].role_name !== "Admin") {
            res.status(403).json({ message: "❌ You are not authorized to delete books" });
            return;
        }

        // Check if the book exists
        const book = await pool.query("SELECT * FROM books WHERE bookid = $1", [bookid]);
        if (book.rows.length === 0) {
            res.status(404).json({ message: "📚 Book not found" });
            return;
        }

        // Delete the book
        await pool.query("DELETE FROM books WHERE bookid = $1", [bookid]);
        res.status(200).json({ message: "✔ Book deleted successfully!" });

    } catch (error) {
        console.error("Error deleting books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// function to update a book by the admin and librarians
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookid, title, author, genre, year, pages, publisher, price, description, image, pdf, user_id } = req.body;

        // Check if user is Admin or Librarian
        const userCheck = await pool.query(
            "SELECT role_name FROM users WHERE user_id = $1",
            [user_id]
        );
        // Check if user is Administrator or Librarian
        if (userCheck.rows.length === 0 || (userCheck.rows[0].role_name !== "Admin" && userCheck.rows[0].role_name !== "Librarian")) {
            res.status(403).json({ message: "You are not authorized to update books" });
            return;
        }

        // Now proceed to update the book
        await pool.query(
            "UPDATE books SET title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, price=$7, description=$8, image=$9, pdf=$10 WHERE bookid=$11",
            [title, author, genre, year, pages, publisher, price, description, image, pdf, bookid]
        );

        res.status(200).json({ message: "✔ Book updated successfully!" });

    } catch (error) {
        console.error("❌ Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// function to fileter books based on titile ,genre and year
export const filterBooks = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { title, genre, year } = req.query;

        // Fetch all books from the database
        const books = await pool.query("SELECT * FROM books");
        let filteredBooks = books.rows;

        // Filter by title if provided
        if (title) {
            filteredBooks = filteredBooks.filter((book) =>
                book.title.toLowerCase().includes((title as string).toLowerCase())
            );
        }

        // Filter by genre if provided
        if (genre) {
            filteredBooks = filteredBooks.filter((book) =>
                book.genre.toLowerCase().includes((genre as string).toLowerCase())
            );
        }

        // Filter by year if provided
        if (year) {
            filteredBooks = filteredBooks.filter((book) =>
                book.year.toString().includes(year as string)
            );
        }

        // If no books match the criteria, send a 404 response
        if (filteredBooks.length === 0) {
            res.status(404).json({ message: "No books found matching your criteria." });
            return;
        }

        // Send filtered books
        res.json(filteredBooks);
    } catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

