import { NextResponse } from 'next/server';

export async function GET(req) {
  // console.log("/logout")
  // const response = NextResponse.redirect('/signup');
  const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const response = NextResponse.redirect(`${baseUrl}/signup`);
  response.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
  return response;
}