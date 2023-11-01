import { NextResponse } from "next/server";
import DBHandler from "../../dbHandler/DBHandler";


export async function GET(req) {
  const {id}=await req.json();
  const dbHandler=new DBHandler();
  try {
    const script = dbHandler.getScriptById(id);
    return NextResponse.json({data: script }); // Devuelve el script como JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
