import { NextResponse } from "next/server";
import DBHandler from "../dbHandler/DBHandler";


export async function POST(req) {
  const {id}=await req.json();
  const dbHandler=new DBHandler();
  try {
    const data=await dbHandler.handleLoad(id);
    return data;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
