import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log(token)
  console.log(req.cookies)

  if (token) {
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      req.user = verifiedToken; // Attach user data if needed
      return NextResponse.next();
    }else{
      return NextResponse.redirect(new URL('/signup', req.url))
    }
  }
  return NextResponse.redirect(new URL('/signup', req.url));
}

export const config = {
  matcher: ['/files', '/chat'], // Specify paths to protect
};