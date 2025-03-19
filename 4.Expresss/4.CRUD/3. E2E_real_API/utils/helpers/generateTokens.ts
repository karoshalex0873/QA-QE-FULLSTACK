import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Response } from "express";

dotenv.config();

export const generateToken = (res: Response, userId: string, roleId: number) => {
  const jwt_secret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!jwt_secret || !refreshSecret) {
    throw new Error("JWT secrets are not defined in environment variables.");
  }

  try {
    const accessToken = jwt.sign({ userId, roleId }, jwt_secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: "30d" });

    // Set access token as HTTPOnly, Secure, and SameSite=Strict
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set refresh token as HTTPOnly
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Token generation failed");
  }
};
