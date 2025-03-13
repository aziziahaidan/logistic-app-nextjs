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

export async function POST(req: Request) {
  try {
    const { id, ...formData } = await req.json();

    const companyCollection = await getCollection("company");
    if (!companyCollection) {
      return Response.json({ message: "Database connection failed" }, { status: 500 });
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      telNo: formData.telNo,
      phoneNo: formData.phoneNo,
      address: formData.address,
      location: formData.location,
    };

    let result;
    if (id !== "new") {
      const updateResult = await companyCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: payload }
      );
      result = updateResult;
    } else {
      const insertResult = await companyCollection.insertOne(payload);
      result = insertResult;
    }

    if (result.acknowledged) {
      return Response.json({
        message: id && id !== "new" ? "User updated successfully" : "User added successfully",
        data: result,
      });
    } else {
      return Response.json({ message: "Operation failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}