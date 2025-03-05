import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { readFileSync } from "fs";

dotenv.config()


const port = process.env.PORT
console.log(port)


const app = express()
app.get('/', (req, res) => {
  res.send('Hello world! this is my first app in express')
})



app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from Vite frontend
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true
}))

const bookinfo = path.resolve()

const bookJson = readFileSync(
  path.join(bookinfo, "db", "db.json"), 'utf-8'
)

const books = JSON.parse(bookJson)
console.log(books)

app.get('/api/books', (req:Request, res:Response) => {

  res.send(books.Books)
})


// query URLSearchParams

app.get("/api/books/filter", (req: Request, res: Response) => {
  try {
    const { title, author, genre, year, pages, publisher, description, image, price } = req.query;

    let filteredBooks = [...books.Books];

    if (title) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes((title as string).toLowerCase())
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.toLowerCase().includes((genre as string).toLowerCase())
      );
    }

    if (year) {
      filteredBooks = filteredBooks.filter((book) =>
        book.year.toString().includes(year as string)
      );
    }

    res.json(filteredBooks);
  } catch (error) {
    console.error("Error filtering books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// creating a server
  app.listen(port, () => {
    console.log(`server is running onport ${port}`)
  })