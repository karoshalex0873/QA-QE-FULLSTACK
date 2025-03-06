// format of developing a server
import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import { userData } from '../db/userData'

// 1. Congigure the dotenv file
dotenv.config()

// 2. intance of express
const app = express()

// 3. load the varibales from the env file
const port = process.env.PORT

// 4. Enables middleswares
// enabels cors for all origin

// 5.Routes eg app.post app.get
// get pnpm 
app.get('/', (req, res) => {
  res.send(`Hey this is my first express server`)
})
// to display data
app.get('/data', (req, res) => {
  res.send(userData)
})

// app.post route used to push data into DB
app.post('/data', (req: Request, res: Response) => {
  // 1 destructure the data 
  const { body } = req

  // incrementing the ID
  const newID = userData.length > 0 ? userData[userData.length - 1].userID + 1 : 1

  // pushing the new data
  const newData = { id: newID, ...body }
  userData.push(newData)

  // sending it to server
  res.send(201).json({
    message: "OK",
    payload: newData
  })
})

// Put requires all fields to update
app.put('/data/:id', (req: Request, res: Response) => {
  // geting id
  const userId = Number(req.params.id)
  // or const{id}=req.params
  const { userName, displayName } = req.body

  // validate the id
  if (isNaN(userId)) {
    res.status(400).json({
      message: "Invalid iD"
    })
    return
  }
  
  // get the userIndex
})

// patch


// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
