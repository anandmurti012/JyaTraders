import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest, res:NextResponse){
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
}