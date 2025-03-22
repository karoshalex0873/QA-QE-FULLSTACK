import { Request, Response, NextFunction } from "express";
import asyncHandler from "../midllewares/asyncHandler";
import { AppDataSource } from "../config/data-source";
import { User } from "../Entities/User";
import bcrypt from "bcryptjs";

// User repository
const userDef = AppDataSource.getRepository(User);

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    // Destructure request body
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await userDef.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = userDef.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save user in the database
    await userDef.save(newUser);

    // Send response
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  }
);
