import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");

export async function POST(req) {
  try {
    const random=Math.floor(Math.random() * 3) + 1;
    const filePath = path.join(process.cwd(), "public", `T${random}.txt`);
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return NextResponse.json({result:fileContent});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}