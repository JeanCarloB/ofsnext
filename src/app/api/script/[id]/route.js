import { NextResponse } from "next/server";
import DBHandler from "../../dbHandler/DBHandler";


export async function GET(req,{ params }) {
  const id = params.id;
  const dbHandler = new DBHandler();
  const parsedInt = parseInt(id);
  try {
    const script = await dbHandler.getScriptById(parsedInt);
    
    if (script) {
      return NextResponse.json({ data: script }); // Devuelve el script como JSON si se encuentra
    } else {
      return NextResponse.json({ message: 'Script not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
