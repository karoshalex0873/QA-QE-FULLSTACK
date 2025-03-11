// format of developing a server
import express, { query, Request, Response } from 'express'
import dotenv from "dotenv"
import pool from '../db/db'
import bcrypt, { compare } from 'bcryptjs';
import cors from "cors"
import jwt from 'jsonwebtoken'

// 1. Congigure the dotenv file
dotenv.config()

// 2. intance of express
const app = express()

// 3. load the varibales from the env file
const port = process.env.PORT

// 4. Enables middleswares
app.use(express.json())
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

// adding users to the database
app.post('/api/v1/user', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    // check if eamil 
    const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1 ", [email])

    if (emailCheck.rows.length > 0) {
      res.status(400).json({ message: "User aleady exists " })
      return
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserting new user
    const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword])

    res.status(201).json({
      message: "User was created succesfully",
      user: userResult.rows
    })

  } catch (error) {
    console.error('Error while creating', error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})
// login the user
app.post('/api/v1/user/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // check if the users exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if (userCheck.rows.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return
    }
    const user = userCheck.rows[0]

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(400).json({ message: "inavlid email or password" })
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })


  } catch (error) {
    console.error('Error while creating', error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

// addig books to database using post
app.post('/api/v1/books', async (req: Request, res: Response) => {
  try {
    const {
      bookId, title, author, genre, year, pages,
      publisher, description, image, price, pdf, user_id
    } = req.body;



    //  Check if `user_id` is provided
    if (!user_id) {
      res.status(400).json({ message: "⚠️ User ID is required !"  });
      return
    }

    if (!title || !author || !genre || !pages || !price) {
      res.status(400).json({
        message: " Missing required fields: title, author, genre, pages, or price !"
      });
      return
    }
    //  Verify user exists in the `users` table instead of `books`
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);

    if (userCheck.rows.length === 0) {
      res.status(400).json({ message: "⚠️ User not authenticated. Please log in." });
      return
    }

    //Checkif the BOOK id exist
    const bookIDCheck = await pool.query("SELECT * from books WHERE bookId = $1", [bookId])
    if (bookIDCheck.rows.length > 0) {
      res.status(400).json({ message: `${bookId} exists, please use a different ID` });
      return
    }


    // ✅ Insert book into the `books` table
    const bookResult = await pool.query(
      `INSERT INTO books (bookId, title, author, genre, year, pages, publisher, 
      description, image, price, pdf, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [bookId, title, author, genre, year, pages, publisher, description, image, price, pdf, user_id]
    );

    res.status(201).json({
      message: "✔️ The book was uploaded successfully",
      book: bookResult.rows[0]
    });

  } catch (error) {
    console.error("Error while adding book:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// getting the books
app.get('/api/v1/books', async (req: Request, res: Response) => {
  try {
    const books = await pool.query("SELECT * FROM books");
    res.status(200).json(books.rows);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// filterFunction
app.get('/api/v1/books/filter', async (req: Request, res: Response) => {
  try {
    const {title,genre,year}=req.query
    const books= await pool.query("SELECT * FROM books")
    let filteredBooks=[...books.rows]

    if(title){
      filteredBooks=filteredBooks.filter((book)=>book.title.toLowerCase().includes((title as string).toLowerCase()))
    }

    if(genre){
      filteredBooks=filteredBooks.filter((book)=>book.genre.toLowerCase().includes((genre as string).toLowerCase()))
    }
    if (year) {
      filteredBooks = filteredBooks.filter(book => 
        book.year.toString().includes(year as string)
      );
    }

    if(filteredBooks.length === 0){
      res.status(404).json({message:"No books found mathing your criteria."})
      return
    }

    res.send(filteredBooks)

  } catch (error) {
    console.error("Error filtering  books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

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






// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
