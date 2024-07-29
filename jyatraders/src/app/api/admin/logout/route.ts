
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ msg: 'Successfully Logged Out.' }, { status: 200 })
    response.cookies.set('jts_token', '', { httpOnly: true });
    response.cookies.set('jts_role', '', { httpOnly: true });
    return response;
}