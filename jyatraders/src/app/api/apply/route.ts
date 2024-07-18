import { NextRequest, NextResponse } from "next/server";
import connection from '../../../lib/db'

export async function POST(request: NextRequest) {
  const data = await request.json();

  // Add createdAt field with current timestamp
  const newData = { ...data, createdAt: new Date() };

  // Insert into database using your connection
  connection.query('INSERT INTO applies SET ?', newData);
  return NextResponse.json({ msg: 'Data successfully submit' }, { status: 201 });
}
