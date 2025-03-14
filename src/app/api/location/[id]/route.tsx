import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const locationCollection = await getCollection("location");
    const location = await locationCollection.findOne({ _id: new ObjectId(id) });

    if (!location) {
        return NextResponse.json({ message: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(location);

}

export async function POST(req: Request) {
    try {
      const { id, ...formData } = await req.json();
  
      const locationCollection = await getCollection("location");
      if (!locationCollection) {
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
      }
  
      const payload = {
        name: formData.name,
        address: formData.address,
        pinpoint: formData.pinpoint,
        telNo:formData.telNo,
        phoneNo: formData.phoneNo,
      };
  
      let result;
      if (id !== "new") {
        const updateResult = await locationCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: payload }
        );
        result = updateResult;
      } else {
        const insertResult = await locationCollection.insertOne(payload);
        result = insertResult;
      }
  
      if (result.acknowledged) {
        return NextResponse.json({
          message: id && id !== "new" ? "User updated successfully" : "User added successfully",
          data: result,
        });
      } else {
        return NextResponse.json({ message: "Operation failed" }, { status: 500 });
      }
    } catch (error) {
      console.error("Error in POST /api/users:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }