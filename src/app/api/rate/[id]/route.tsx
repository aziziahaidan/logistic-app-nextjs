import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const rateCollection = await getCollection("rate");
    const rate = await rateCollection.findOne({ _id: new ObjectId(id) });

    if (!rate) {
        return NextResponse.json({ message: "rate not found" }, { status: 404 });
    }

    return NextResponse.json(rate);

}

export async function POST(req: Request) {
    try {
      const { id, ...formData } = await req.json();
  
      const rateCollection = await getCollection("rate");
      if (!rateCollection) {
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
      }
  
      const payload = {
        name: formData.name,
        from: new ObjectId(formData.from),
        to: new ObjectId(formData.to),
        price:parseFloat(formData.price),
        capacity:formData.capacity,
        remarks:formData?.remarks
      };
  
      let result;
      if (id !== "new") {
        const updateResult = await rateCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: payload }
        );
        result = updateResult;
      } else {
        const insertResult = await rateCollection.insertOne(payload);
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