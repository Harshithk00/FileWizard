import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const signToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

export const verifyToken = async(token) => {
  try {
    console.log(jwt.verify(token, SECRET_KEY))
    return jwt.verify(token, SECRET_KEY);
    
  } catch (error) {
    const response = error.message
    return response??"Error occured";
  }
};