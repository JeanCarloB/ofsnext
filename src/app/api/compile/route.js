import {NextResponse} from 'next/server';

export async function POST(req, res) {
    try {
      const data = await req.json();
      const timestampedText = `Echo from server at ${new Date().toISOString()}\n${
        data.text
      } `;
      return NextResponse.json({ result: timestampedText });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Script not found" }, { status: 500 });
    }
  }