import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");

export async function POST(req) {
  const {id}=await req.json();
  try {
    // Leer el archivo JSON actual si existe
    const filePath = path.join(process.cwd(), "public", "scripts.json");
    let existingScripts = [];

    try {
      existingScripts = await fs.promises.readFile(filePath, "utf-8");
      existingScripts = JSON.parse(existingScripts);
      const script=existingScripts.find(e=>e.id===id);
      return NextResponse.json({ script: script });
    } catch (readError) {
      // El archivo aún no existe o no se pudo leer, lo manejaremos como un array vacío.
      console.error(readError)
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
