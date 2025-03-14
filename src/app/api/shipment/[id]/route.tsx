import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { id: string } }) {

  const { id } = params; //deconstruct to put as param

  const shipmentCollection = await getCollection("shipment");
  const shipment = await shipmentCollection.findOne({ _id: new ObjectId(id) });

  if (!shipment) {
    return NextResponse.json({ message: "shipment not found" }, { status: 404 });
  }

  return NextResponse.json(shipment);

}

export async function POST(req: Request) {
  try {
    const { id, ...formData } = await req.json();

    const shipmentCollection = await getCollection("shipment");
    if (!shipmentCollection) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const payload = {
      billedTo: new ObjectId(formData.billedTo),
      from: new ObjectId(formData.from),
      to: new ObjectId(formData.to),
      pickupDate: new Date(formData.pickupDate),
      unloadDate: new Date(formData.unloadDate),
      price: parseFloat(formData.price),
      capacity: formData.capacity,
      remarks: formData?.remarks,
      isPaid: false
    };

    let result;
    if (id !== "new") {
      const updateResult = await shipmentCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: payload }
      );
      result = updateResult;
    } else {
      const insertResult = await shipmentCollection.insertOne(payload);
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