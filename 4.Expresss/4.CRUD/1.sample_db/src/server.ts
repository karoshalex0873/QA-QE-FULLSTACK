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
// Enable JSON parsing middleware
app.use(express.json());
// enabels cors for all origin

// 5.Routes eg app.post app.get
// get pnpm 
app.get('/', (req, res) => {
  res.send(`Hey this is my first express server`)
})
// to display data
app.get('/api/data', (req, res) => {
  res.send(userData)
})

// app.post route used to push data into DB
app.post('/api/data', (req: Request, res: Response) => {
  // 1. Destructure the data from the request body
  const { body } = req;

  // 2. Generate a unique ID
  const newId = userData.length > 0 ? userData[userData.length - 1].userID + 1 : 1;

  // 3. Create a new data object with the generated ID
  const newData = { id: newId, ...body };

  // 4. Push the new data into the array
  userData.push(newData);

  // 5. Send response with a success status
  res.status(201).json({
    message: "OK",
    payload: newData
  });
});



// Put requires all fields to update
app.put('/api/data/:id', (req: Request, res: Response) => {
  // geting id
  const userId = Number(req.params.id)
  // or const{id}=req.params
  const { body} = req


  // validate the id
  if (isNaN(userId)) {
    res.status(400).json({
      message: "Invalid iD"
    })
    return
  }
  // get the userIndex
  const userIndex = userData.findIndex((user)=>user.userID ===userId)
  // checking in the user is available or not
  if(userIndex === -1){
    res.status(404).json({message:"User not foound"})
    return
  }
  // adding relevant data
  userData[userIndex]={ userID:userId,...body}
  res.json({message:"User succefully updated",user:userData[userIndex]})
})

// patch


// 6 cretate server Listen
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
