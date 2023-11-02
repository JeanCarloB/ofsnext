import {NextResponse} from 'next/server';
import DBHandler from '../dbHandler/DBHandler';

export async function POST(req) {
  const dbHandler=new DBHandler();
  const {id_script} = await req.json();
    try {
      const data = await dbHandler.handleEval(id_script);
      return NextResponse.json({ result: data });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: err }, { status: 500 });
    }
  }
