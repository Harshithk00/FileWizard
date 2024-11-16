import { poolAuth } from "@/utils/db";
import { poolChat } from "@/utils/dbChat";
import { verifyToken } from "@/utils/jwt";

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
        
        const user = decodedToken.username;
        const { message } = await req.json();
        
        const result = await poolAuth.query(
            'INSERT INTO userschat (username, chat) VALUES ($1, $2)',
            [user, message]
          );
          
        console.log("Query result:", result);


        return new Response(JSON.stringify({ message: 'Msg uploaded' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating msg', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}