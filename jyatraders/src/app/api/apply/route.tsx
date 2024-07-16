import { NextRequest, NextResponse } from "next/server";
import connection from '../../../database/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Add createdAt field with current timestamp
    const newData = { ...data, createdAt: new Date() };

    // Insert into database using your connection
    connection.query('INSERT INTO applies SET ?', newData, function (error, results, fields) {
      if (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ msg: error.sqlMessage }, { status: 500 });
      } else {
        console.log("Data inserted successfully");
      }
    });
    return NextResponse.json({ msg: 'Data successfully submit' }, { status: 201 });

  } catch (error) {
    console.error('Server Error', error);
    return NextResponse.json({ msg: 'Server Error' }, { status: 500 });
  }
}
