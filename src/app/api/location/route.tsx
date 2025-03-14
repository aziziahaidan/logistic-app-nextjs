import getCollection from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const locationCollection = await getCollection("location");

    const location = await locationCollection.find().toArray();
    return NextResponse.json(location);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
