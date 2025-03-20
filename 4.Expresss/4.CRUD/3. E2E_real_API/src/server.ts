import { setupAliases } from "import-aliases";
setupAliases()
import express ,{ Request,Response } from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from "@app/routes/authRoutes";
import userRoutes from "@app/routes/userRoutes";
import cookieParser from 'cookie-parser';
import booksRoutes from "@app/routes/booksRoutes";
import borroweRoutes from "./routes/borroweRoutes";

// 1. Congigure the dotenv file

dotenv.config()

// 2. intance of express

const app = express();

// 3. load the varibales from the env file

const port = process.env.PORT;

// 4. Enables middleswares

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from Vite frontend
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true
}))

// 5. Routes eg app.post app.get
app.get('/', (req, res) => {
  res.send(`Books server using postgress`)
})

// auth router
app.use('/api/v1/auth',authRoutes)

// user router
app.use('/api/v1/user',userRoutes)

// books router
app.use('/api/v1/books',booksRoutes)

//borrower router
app.use('/api/v1/borrower',borroweRoutes)

app.listen(port, () => {
  console.log(`Server is running  http://localhost:${port}`)
})





