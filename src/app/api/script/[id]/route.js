import { NextResponse } from "next/server";
const fs = require("fs").promises; // Utiliza fs.promises para el uso async/await
const path = require("path");

export async function GET(request, { params }) {
  try {
    const filePath = path.join(process.cwd(), "public", `${params.id}.txt`);
    const fileContent = await fs.readFile(filePath, "utf-8"); // Utiliza await directamente aquí
    return NextResponse.json({ message: fileContent }); // Envia el contenido del archivo como JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Script not found' }, { status: 500 });
  }
}
