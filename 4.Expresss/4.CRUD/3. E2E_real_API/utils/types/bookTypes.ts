import { UserRequest } from "./userTypes";

export interface Book{
  book_id:number
  title:string
  author:string
  genre:string
  year:number
  pages:number
  publisher:string
  desciption:string
  image:string
  pdf:string
}

export interface BookRequest extends UserRequest{
  params:{
    book_id:string
  }
}