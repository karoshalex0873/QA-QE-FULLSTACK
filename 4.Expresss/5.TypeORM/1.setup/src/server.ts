import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

//instace of express
const app = express();

// connect to the database

// load port from .env
const PORT = process.env.PORT

// middleware to parse json request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rouers from midllewares
app.use('/api/v1/auth',authRoutes)

//router for post
app.use('/api/v1/post',postRoutes)


AppDataSource.initialize()
.then(()=>console.log("🚀 Database connected succsefully"))
.catch((error)=>console.log("Database connection error:",error))

// start server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

