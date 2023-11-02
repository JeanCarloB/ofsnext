import { NextResponse } from "next/server";
import DBHandler from "../dbHandler/DBHandler";

export async function POST(req) {
  const {description,script} = await req.json();
  const dbHandler=new DBHandler();
  try {
    // Leer el archivo JSON actual si existe
    const data = await dbHandler.createScript(description,script);
    return NextResponse.json({ script: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req) {
  const { id_script,description,script } = await req.json(); // Solo necesitas el script y el ID

  const dbHandler = new DBHandler();

  try {
    if (!id_script) {
      return NextResponse.json(
        { message: "ID is required for updating a script" },
        { status: 400 }
      );
    }

    // Llama a la función de actualización en tu DBHandler
    const updatedScript = await dbHandler.updateScript(id_script, description,script);

    if (updatedScript) {
      return NextResponse.json({ script: updatedScript });
    } else {
      return NextResponse.json(
        { message: "Script with the provided ID not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
