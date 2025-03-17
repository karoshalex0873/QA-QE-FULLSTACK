import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import { RoleRequest } from "../../../utils/types/userRoleTypes";

// General role guard function
const roleGuard = (allowedRoles: string[]) =>
  asyncHandler<void, RoleRequest>(async (req: RoleRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role_name)) {
      res.status(403).json({ message: "Access denied !!" });
      return
    }
    next();
  });

// Specific guards
const adminGuard =roleGuard(["Admin"])//admin privileges
const LibrarianGuard=roleGuard(["Librarian"])//libararian privarages
const adminOrLibrarianGuard = roleGuard(["Admin", "Librarian"]); // Both Admin and Librarian
const borrowerGuard = roleGuard(["Borrower"]); // Borrower (read-only)
const allusersGuard = roleGuard(["Admin","Librarian","Borrower"]); //all users privallages

export { roleGuard, adminOrLibrarianGuard, borrowerGuard ,adminGuard,allusersGuard,LibrarianGuard };
