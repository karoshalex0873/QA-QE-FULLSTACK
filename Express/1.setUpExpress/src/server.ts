import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { readFileSync } from "fs";

dotenv.config()


const port=process.env.PORT
console.log(port)
console.log(port)


const app =express ()
app.get('/',(req, res)=>{
  res.send('Hello world! this is my first app in express')
})

app.listen(port,()=>{
  console.log(`server is running onport ${port}`)
})

app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from Vite frontend
  methods:["GET","PUT","POST","DELETE"],
  credentials:true
}))

const bookinfo= path.resolve()

const bookJson= readFileSync(
  path.join(bookinfo,"db","db.json"),'utf-8'
)

const books=JSON.parse(bookJson)


app.get('/mybooks',(req, res)=>{
  res.send(books.Books)
})