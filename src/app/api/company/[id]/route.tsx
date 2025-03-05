import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const companyCollection = await getCollection("company");
    const company = await companyCollection.findOne({ _id: new ObjectId(id) });

    if (!company) {
        return Response.json({ message: "Company not found" }, { status: 404 });
    }

    return Response.json(company);

}