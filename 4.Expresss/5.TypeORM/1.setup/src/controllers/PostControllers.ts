import { Request,Response } from "express";
import asyncHandler from "../midllewares/asyncHandler";
import { AppDataSource } from "../config/data-source";
import { Post } from "../Entities/Post";


//Post repository
const postDef = AppDataSource.getRepository(Post)

export const addPost = asyncHandler(
  async(req:Request,res:Response)=>{
    //destruture the body
    const {title,content,image,userId}=req.body

    //create new post
    const newPost = postDef.create({
      title,
      content,
      image,
      user:{id:userId}
    })

    //save post in the database
    await postDef.save(newPost)

    //send response
    return res.status(201).json({message:"Post created successfully",post:newPost})
  }
)