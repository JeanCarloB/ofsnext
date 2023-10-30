import { NextResponse } from "next/server";
const fs = require("fs").promises;
const path = require("path");

export async function GET(request, { params }) {
  const id=params.id;
  console.log(id);
  try {
    // Cargar los scripts desde scripts.json
    const scriptsFilePath = path.join(process.cwd(), "public", "scripts.json");
    const scripts = JSON.parse(await fs.readFile(scriptsFilePath, "utf-8"));

    // Buscar el script por ID en scripts.json
    const script = scripts.find((script) => script.id === parseInt(params.id, 10));
    if (script) {
      return NextResponse.json({data: script }); // Devuelve el script como JSON
    } else {
      return NextResponse.json({ message: 'Script not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
