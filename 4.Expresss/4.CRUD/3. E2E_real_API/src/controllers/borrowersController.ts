import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "@app/config/db.config";
import { UserRequest } from "utils/types/userTypes";

export const BorrowBook = asyncHandler(
  async (req: UserRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "Access denied" });

    const { copy_id, user_id } = req.body;

    // Borrower creates request
    if (req.user.role_name === "Borrower") {
      if (!copy_id) return res.status(400).json({ message: "copy_id required" });

      // Check existing requests/loans
      const existing = await pool.query(
        `SELECT * FROM borrowers 
         WHERE user_id = $1 AND copy_id = $2 
         AND status IN ('Pending', 'Borrowed')`,
        [req.user.user_id, copy_id]
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({ message: "Existing request or active loan" });
      }

      // Check book exists
      const book = await pool.query(
        "SELECT * FROM book_copies WHERE copy_id = $1",
        [copy_id]
      );
      if (book.rows.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Create pending request
      const request = await pool.query(
        `INSERT INTO borrowers 
         (user_id, copy_id, status) 
         VALUES ($1, $2, 'Pending') 
         RETURNING *`,
        [req.user.user_id, copy_id]
      );

      return res.status(201).json(request.rows[0]);
    }

    // Admin/Librarian approval
    if (req.user.role_name === "Admin" || req.user.role_name === "Librarian") {
      if (!user_id || !copy_id) {
        return res.status(400).json({ message: "Missing user_id or copy_id" });
      }

      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        // Get and lock pending request
        const request = await client.query(
          `SELECT * FROM borrowers 
           WHERE user_id = $1 AND copy_id = $2 
           AND status = 'Pending' 
           FOR UPDATE SKIP LOCKED`,
          [user_id, copy_id]
        );

        if (request.rows.length === 0) {
          await client.query("ROLLBACK");
          return res.status(404).json({ message: "No pending request found" });
        }

        // Update book status
        await client.query(
          "UPDATE book_copies SET status = 'Borrowed' WHERE copy_id = $1",
          [copy_id]
        );

        // Approve request
        const approved = await client.query(
          `UPDATE borrowers SET
            librarian_id = $1,
            borrow_date = NOW(),
            return_date = NOW() + INTERVAL '14 days',
            status = 'Borrowed'
           WHERE user_id = $2 AND copy_id = $3
           RETURNING *`,
          [req.user.user_id, user_id, copy_id]
        );

        await client.query("COMMIT");
        res.status(200).json(approved.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ 
          message: "Approval failed",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      } finally {
        client.release();
      }
    }

    return res.status(403).json({ message: "Forbidden" });
  }
);

export const ReturnBook = asyncHandler(
  async (req: UserRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "Access denied" });

    const { copy_id, user_id } = req.body;
    const targetUser = req.user.role_name === "Borrower" 
      ? req.user.user_id 
      : user_id;

    if (!copy_id || (!user_id && req.user.role_name !== "Borrower")) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Verify active loan exists
      const loan = await client.query(
        `SELECT * FROM borrowers 
         WHERE user_id = $1 AND copy_id = $2 
         AND status = 'Borrowed' 
         FOR UPDATE`,
        [targetUser, copy_id]
      );

      if (loan.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "No active loan found" });
      }

      // Update book status
      await client.query(
        "UPDATE book_copies SET status = 'Available' WHERE copy_id = $1",
        [copy_id]
      );

      // Update loan status
      const result = await client.query(
        `UPDATE borrowers SET
          status = 'Returned',
          return_date = NOW()
         WHERE user_id = $1 AND copy_id = $2
         RETURNING *`,
        [targetUser, copy_id]
      );

      await client.query("COMMIT");
      res.status(200).json({ 
        message: "Return successful",
        data: result.rows[0]
      });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).json({ 
        message: "Return failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      client.release();
    }
  }
);