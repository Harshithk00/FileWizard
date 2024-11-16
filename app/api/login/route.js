import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { signToken } from '@/utils/jwt';
import { poolAuth } from '@/utils/db';


export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const { rows } = await poolAuth.query('SELECT * FROM users WHERE username = $1', [username]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }


    //JWTtoken here
    const token = signToken({ id: user.id, username: user.username });
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict'});
    return response;
    
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Error during login', error: error.message }, { status: 500 });
  }
}