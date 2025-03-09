// format of developing a server
import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import pool from '../db/db'


// 1. Congigure the dotenv file
dotenv.config()

// 2. intance of express
const app = express()

// 3. load the varibales from the env file
const port = process.env.PORT

// 4. Enables middleswares
app.use(express.json())
// enabels cors for all origin


// 5.Routes eg app.post app.get
// get pnpm 
app.get('/', (req, res) => {
  res.send(`Books server using postgress`)
})
// to display data

app.post('/api/v1/user', async (req: Request, res: Response) => {
  try {
    const { name,email, password } = req.body

    // check if eamil 
    const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1 ",[email])

    if(emailCheck.rows.length > 0){
      res.status(400).json({message:"User aleady exists"})
      return  
    }


    // inserting new user
    const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",[name,email,password])

    res.status(201).json({
      message:"User was created succesfully",
      user:userResult.rows
    })

  } catch (error) {
    console.error('Error while creating',error)
    res.status(500).json({
      message:"Internal server error"
    })
  }
})


// app.post route used to push data into DB


// Put requires all fields to update

// patch


// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
