import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Response } from 'express'

dotenv.config()

console.log('jwt_secret 🔥🚀', process.env.JWT_SECRET)
console.log('refreshToken 🔥🚀', process.env.ACCESS_TOKEN_SECRET)

export const generateToken = (res: Response, userId: string, roleId: number) => {
  const jwt_secret = process.env.JWT_SECRET
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET

  if (!jwt_secret || !refreshSecret) {
    throw new Error('jwt_secret is not defined in the environment variables. Please set it')
  }

  try {
    const accessToken = jwt.sign({ userId, roleId }, jwt_secret, { expiresIn: "15m" })
    // long live access token for 30days

    const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: "30d" })

    // set access token as HTTP-Only secure token 
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    })

    //set refresh token as HTTP-Only secure cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    return { accessToken, refreshSecret }
  } catch (error) {
    console.error('Error getting JWT token', error)
    throw new Error('Failed to generate tokens')
  }
}