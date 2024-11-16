import { verifyToken } from '@/utils/jwt';
import { poolAuth } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' },{status:401});
  }
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' },{status:401})
    }
    
    const userId = decodedToken.username;
    const {rows} = await req.json();
    const chatHistory = await getChatHistory(userId,rows);
    
    return NextResponse.json({ chatHistory: chatHistory },{status:200});

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' },{status:500});
  }
}

async function getChatHistory(userId,N=100) {
    const result = await poolAuth.query("SELECT * FROM userschat ORDER BY chatid DESC LIMIT $1",[N])
    return result.rows;
}