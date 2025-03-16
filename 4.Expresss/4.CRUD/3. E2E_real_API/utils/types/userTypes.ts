import { Request } from "express";

export interface User{
  user_id: string;
  name: string;
  email: string;
  password?: string; // excluded when returning user info
  role_id:number;
  role_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserRequest extends Request {
  user?: User;
}