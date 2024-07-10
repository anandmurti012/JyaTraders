import { NextRequest, NextResponse } from "next/server";
import connection from '../../../database/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log(process.env.API_URL)
    /// save...

    connection


    return NextResponse.json({ msg: 'Sign Valid' }, { status: 201 })
  } catch (error) {
    console.log('Server Error', error);
  }
}