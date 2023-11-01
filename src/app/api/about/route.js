import { NextResponse } from "next/server";
import DBHandler from '@/app/api/dbHandler/DBHandler';

export async function GET() {
  const dbHandler=new DBHandler();
  try {
    const data=await dbHandler.getAbout();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}