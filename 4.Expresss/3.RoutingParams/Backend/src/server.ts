import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { readFileSync } from "fs";
import { events } from "../db/events";

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
app.get('/api/books', (req: Request, res: Response) => {
  res.send(books.Books)
})

// Route Params
// fetch book by id
app.get('/api/book/:id', (req: Request, res: Response) => {
  try {
    // Ensure that the req.params is a valid number
    const eventId = Number(req.params.id)
    if (isNaN(eventId)) {
      res.status(400).json({ message: "Invalid Event ID" });
      return //to stop further exectusion
    }

    // Find the event in dataset
    const event = events.find((eventObject) => eventObject.id === eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return
    }

    res.json(event)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
})





// creating a server
app.listen(port, () => {
  console.log(`server is running onport ${port}`)
})