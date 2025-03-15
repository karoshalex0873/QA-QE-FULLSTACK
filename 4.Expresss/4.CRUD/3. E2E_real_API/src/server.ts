import express ,{ Request,Response } from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from "./routes/authRoutes";

// 1. Congigure the dotenv file

dotenv.config()

// 2. intance of express

const app = express();

// 3. load the varibales from the env file

const port = process.env.PORT;

// 4. Enables middleswares

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running  http://localhost:${port}`)
})





