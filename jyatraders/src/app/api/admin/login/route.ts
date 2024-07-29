import connection from "../../../../lib/db";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.json();
    const { email, password } = data

    // Insert into database using your connection
    const [rows] = await connection.query(`SELECT email,password FROM admins WHERE email='${email}' AND password='${password}'`);

    if (rows.length > 0) {
        const tokenData = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
            role: 'admin'
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        const response = NextResponse.json({ msg: 'Successfully logged in', token: token }, { status: 200 })
        response.cookies.set('jts_token', token, { httpOnly: true });
        response.cookies.set('jts_role', 'admin', { httpOnly: true });
        return response;
    }
    return NextResponse.json({ msg: 'Invalid User Id or Password' }, { status: 401 });
}