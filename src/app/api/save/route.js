import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");

export async function POST(req) {
  const { text, script } = await req.json();

  try {
    // Leer el archivo JSON actual si existe
    const filePath = path.join(process.cwd(), "public", "scripts.json");
    let existingScripts = [];

    try {
      existingScripts = await fs.promises.readFile(filePath, "utf-8");
      existingScripts = JSON.parse(existingScripts);
    } catch (readError) {
      // El archivo aún no existe o no se pudo leer, lo manejaremos como un array vacío.
    }

    // Generar un nuevo ID
    const id = existingScripts.length + 1;

    // Extraer el nombre del script (primera línea antes del salto de línea)
    const scriptMes = script.split("\0")[0].trim();

    // Crear el nuevo script en el formato deseado
    const newScript = {
      id,
      text,
      script:scriptMes,
    };

    // Agregar el nuevo script al array
    existingScripts.push(newScript);

    // Escribir el array actualizado en el archivo JSON
    await fs.promises.writeFile(filePath, JSON.stringify(existingScripts, null, 2));

    return NextResponse.json({ scripts: existingScripts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req) {
  const { text, script, id } = await req.json();

  try {
    // Leer el archivo JSON actual si existe
    const filePath = path.join(process.cwd(), "public", "scripts.json");
    let existingScripts = [];

    try {
      existingScripts = await fs.promises.readFile(filePath, "utf-8");
      existingScripts = JSON.parse(existingScripts);
    } catch (readError) {
      // El archivo aún no existe o no se pudo leer, lo manejaremos como un array vacío.
    }

    // Verificar si se proporcionó un ID
    if (id) {
      // Buscar el script existente por su ID
      const existingScriptIndex = existingScripts.findIndex((s) => s.id === id);

      if (existingScriptIndex !== -1) {
        // Actualizar el script existente
        existingScripts[existingScriptIndex] = {
          id,
          text,
          script: script.split("\0")[0].trim(),
        };
      } else {
        // El ID proporcionado no coincide con ningún script existente, devolver un error
        return NextResponse.json(
          { message: "Script with the provided ID not found" },
          { status: 404 }
        );
      }
    } else {
      // Si no se proporciona un ID, devolver un error ya que PUT generalmente se usa para actualizar scripts existentes
      return NextResponse.json(
        { message: "ID is required for updating a script" },
        { status: 400 }
      );
    }

    // Escribir el array actualizado en el archivo JSON
    await fs.promises.writeFile(filePath, JSON.stringify(existingScripts, null, 2));

    return NextResponse.json({ scripts: existingScripts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
