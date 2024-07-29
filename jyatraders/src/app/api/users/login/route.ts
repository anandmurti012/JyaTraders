import connection from "../../../../lib/db";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.json();
    const { email, password } = data

    // Insert into database using your connection
    const [rows] = await connection.query(`SELECT email,password FROM users WHERE email='${email}'`);

    if (rows.length > 0) {

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const tokenData = {
                id: user.id,
                name: user.name,
                email: user.email,
            }

            const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

            const response = NextResponse.json({ msg: 'Successfully logged in' }, { status: 200 })
            response.cookies.set('jts_token', token, { httpOnly: true });
            response.cookies.set('jts_role', 'user', { httpOnly: true });
            return response;
        } else {
            return NextResponse.json({ msg: 'Invalid Password' }, { status: 401 });
        }
    }
    return NextResponse.json({ msg: 'Invalid User Id' }, { status: 401 });
}