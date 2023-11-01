import { NextResponse } from "next/server";
import DBHandler from "../dbHandler/DBHandler";


export async function GET() {
  const dbHandler=new DBHandler();
  try {
    const data = await dbHandler.getScripts();
    return NextResponse.json({scripts:data});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}