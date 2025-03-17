import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import jwt from "jsonwebtoken";
import pool from "../../config/db.config";
import { UserRequest } from "../../../utils/types/userTypes";

export const protect = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Get token from cookies (fixing undefined issue)
    if (!token && req.cookies["access_token"]) {
      token = req.cookies["access_token"]; // Fix undefined issue
    }

    // Ensure token exists
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("No JWT secret provided");
      }

      if (!token) {
        throw new Error("Token is undefined");
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; roleId: number };

      // Fetch user from database
      const userQuery = await pool.query(
        "SELECT users.user_id, users.name, users.email, users.role_id, user_role.role_name FROM users JOIN user_role ON users.role_id = user_role.role_id WHERE users.user_id = $1",
        [decoded.userId]
      );

      if (userQuery.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = userQuery.rows[0];

      next();
    } catch (error) {
      console.error("Error:", error);
      return res.status(401).json({ message: "No token failed" });
    }
  }
);
