import {NextResponse} from 'next/server';

export async function POST(req, res) {
    try {
      const data = await req.json();
      const timestampedText = `${
        data.text
      } \nEcho from server at ${new Date().toISOString()}`;
      return NextResponse.json({ result: timestampedText });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Script not found" }, { status: 500 });
    }
  }