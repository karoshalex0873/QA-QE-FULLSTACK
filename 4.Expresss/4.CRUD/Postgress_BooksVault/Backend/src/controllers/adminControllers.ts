import { Request, Response } from "express";
import pool from "../config/db";
import jwt from "jsonwebtoken";

// Update a user's role. Only admins can make this request.

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { userId } = req.params;
    const { newRole } = req.body;

    // Extract admin ID from JWT
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Authorization header missing");
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role_name: string };
    const adminId = decoded.userId;

    // Admin validation
    const adminCheck = await client.query(
      "SELECT role_name FROM users WHERE user_id = $1",
      [adminId]
    );
    if (adminCheck.rows[0]?.role_name !== "Admin") {
      throw new Error("Only admins can update roles");
    }

    // Prevent self-role change
    if (userId === adminId) {
      throw new Error("Cannot modify your own role");
    }

    // User existence check
    const userCheck = await client.query(
      "SELECT 1 FROM users WHERE user_id = $1",
      [userId]
    );
    if (userCheck.rows.length === 0) throw new Error("User not found");

    // Update roles in transaction
    await client.query(
      "UPDATE users SET role_name = $1 WHERE user_id = $2",
      [newRole, userId]
    );
    await client.query(
      "UPDATE user_roles SET role_name = $1 WHERE user_id = $2",
      [newRole, userId]
    );

    await client.query("COMMIT");
    res.json({ message: `Role updated to ${newRole} successfully` });
  } catch (error) {
    await client.query("ROLLBACK");
    const message = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ message });
  } finally {
    client.release();
  }
};

  
export const getAppUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT user_id, name, email, role_name, created_at 
      FROM users
      ORDER BY role_name DESC, created_at ASC
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};