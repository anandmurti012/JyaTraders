import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import connection from "../../../../lib/db";

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.formData();

    const courseImage: File | null = data.get('image') as unknown as File

    // Image
    const bytesImage = await courseImage.arrayBuffer();
    const bufferThumbnail = Buffer.from(bytesImage);

    const filePath = `./public/uploads/${courseImage.name}`
    await writeFile(filePath, bufferThumbnail)

    const newData = {
        title: data.get('title'),
        price: data.get('price'),
        description: data.get('description'),
        validity: data.get('validity'),
        link: data.get('link'),
        image: courseImage.name,
        createdAt: new Date()
    };

    // Insert into database using your connection
    connection.query('INSERT INTO courses SET ?', newData);
    return Response.json({ msg: 'Successfully Uploaded' }, { status: 201 });
}

export async function GET(request: NextRequest) {

    // Extract the 'id' parameter from the query string
    const id = request.nextUrl.searchParams.get('id');

    if (id) {
        const [results] = await connection.query(`SELECT * FROM courses WHERE id=${id}`);
        return Response.json({ results: results[0], msg: 'Successfully Fetched' }, { status: 200 });
    } else {
        const [results] = await connection.query(`SELECT * FROM courses`);
        return Response.json({ results: results, msg: 'Successfully Fetched' }, { status: 200 });
    }
}