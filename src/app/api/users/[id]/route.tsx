import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);

}