// format of developing a server
import express, { query, Request, Response } from 'express'
import dotenv from "dotenv"
import pool from './config/db'

import bcrypt, { compare } from 'bcryptjs';
import cors from "cors"
import jwt from 'jsonwebtoken'

import userRoutes from './routes/userRoutes'
import bookRoutes from './routes/bookRoutes'
import { notFound } from './middlewares/erroMiddlewares';


// 1. Congigure the dotenv file
dotenv.config()

// 2. intance of express
const app = express()

// 3. load the varibales from the env file
const port = process.env.PORT

// 4. Enables middleswares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// enabels cors for all origin

app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from Vite frontend
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true
}))

// 5.Routes eg app.post app.get
// get pnpm 
app.get('/', (req, res) => {
  res.send(`Books server using postgress`)
})

// users registartions and users login functionalities
app.use("/api/V1/users", userRoutes)


// Bookstore
// add book to store 
app.use('/api/V1/books', bookRoutes)

app.use(notFound)





// getting a single book by 
app.get('/api/v1/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (book.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return
    }

    res.status(200).json(book.rows[0]);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Put requires all fields to update
app.put('/api/v1/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      bookId, title, author, genre, year, pages,
      publisher, description, image, price, pdf, user_id
    } = req.body;

    // Ensure the book exists
    const bookCheck = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (bookCheck.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return
    }

    // Update the book
    const updatedBook = await pool.query(
      `UPDATE books SET bookId = $1, title = $2, authors = $3, genre = $4, year = $5, pages = $6, publisher = $7, description = $8, image = $9, price = $10, pdf = $11, user_id = $12 
       WHERE id = $13 RETURNING *`,
      [bookId, title, author, genre, year, pages, publisher, description, image, price, pdf, user_id, id]
    );

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook.rows[0]
    });

  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// patch a book
app.patch('/api/v1/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Contains only the fields to be updated

    // Ensure the book exists
    const bookCheck = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (bookCheck.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return
    }

    // Generate dynamic SQL query for updating only provided fields
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      res.status(400).json({ message: "No fields provided for update" });
      return
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
    const query = `UPDATE books SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

    const updatedBook = await pool.query(query, [...values, id]);

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook.rows[0]
    });

  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// deleting a  book
app.delete('/api/v1/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure the book exists
    const bookCheck = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (bookCheck.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return
    }

    // Delete the book
    await pool.query("DELETE FROM books WHERE id = $1", [id]);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const addDefaultRoles = async () => {
  try {
    const roles = ['Admin', 'Librarian', 'Borrower'];

    for (const role of roles) {
      await pool.query(
        "INSERT INTO user_roles (role_name) VALUES ($1) ON CONFLICT (role_name) DO NOTHING",
        [role]
      );
    }

    console.log("Roles added successfully!");
  } catch (error) {
    console.error("Error inserting roles:", error);
  }
};

// Call this function once when your server starts
addDefaultRoles();






// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
