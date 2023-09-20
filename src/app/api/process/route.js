// Import the necessary dependencies
import { NextResponse } from 'next/server';

// Define the server-side handler for POST requests
export async function POST(req) {
  try {
    // Parse the request body as JSON
    const requestBody = await req.json();

    // Access the 'text' property from the parsed JSON
    const timestampedText = `Echo from server: at ${new Date().toISOString()}: ${requestBody.text}`;
    
    // Return the response with the computed result
    return NextResponse.json({ result: timestampedText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
