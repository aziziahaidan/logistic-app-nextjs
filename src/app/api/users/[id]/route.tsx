import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);

}