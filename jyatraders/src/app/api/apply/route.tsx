import { NextRequest, NextResponse } from "next/server";
import connection from '../../../database/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    /// save...

    return NextResponse.json({ msg: 'Sign Valid' }, { status: 201 })
  } catch (error) {
    console.log('Server Error', error);
  }
}