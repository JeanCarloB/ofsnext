import { NextResponse } from "next/server";
import DBHandler from "../dbHandler/DBHandler";
export async function POST(req) {
  const {id} = await req.json();
  const dbHandler=new DBHandler();
  try {
    const data=await dbHandler.handleEval(id);
    return NextResponse.json({result:data});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}