// format of developing a server
import express from 'express'
import dotenv from "dotenv"
import pool from './config/db'

import cors from "cors"
import jwt from 'jsonwebtoken'

import userRoutes from './routes/userRoutes'
import bookRoutes from './routes/bookRoutes'
import { notFound } from './middlewares/erroMiddlewares';
import adminRoutes from './routes/adminRoutes'


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
app.get('/', (req, res) => {
  res.send(`Books server using postgress`)
})

// users 
app.use("/api/V1/users", userRoutes)

// Bookstore
app.use('/api/V1/books', bookRoutes)


app.use('/api/V1/users',adminRoutes)

app.use(notFound)


const addDefaultRoles = async () => {
  try {
    const roles = ['Borrower', 'Librarian', 'Admin'];

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




// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
