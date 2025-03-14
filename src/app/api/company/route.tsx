import getCollection from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companyCollection = await getCollection("company");

    const company = await companyCollection.find().toArray();
    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
