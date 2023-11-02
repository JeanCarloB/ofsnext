import {NextResponse} from 'next/server';
import DBHandler from '../dbHandler/DBHandler';

export async function POST(req) {
  const dbHandler=new DBHandler();
    try {
      const data = await dbHandler.handleCompile(req);
      return NextResponse.json({ result: data });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: err }, { status: 500 });
    }
  }