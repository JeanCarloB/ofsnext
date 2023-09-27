import {NextResponse} from 'next/server';
const fs = require("fs");
const path = require("path");

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "keywords.json");
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const data=JSON.parse(fileContent);
    return NextResponse.json({keywords:data});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}