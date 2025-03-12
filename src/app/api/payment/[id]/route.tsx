import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";


export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params; //deconstruct to put as param

    const shipmentCollection = await getCollection("shipment");
    const shipment = await shipmentCollection.findOne({ _id: new ObjectId(id) });

    if (!shipment) {
        return Response.json({ message: "shipment not found" }, { status: 404 });
    }

    return Response.json(shipment);

}

export async function POST(req: Request) {
    try {
      const { id, ...formData } = await req.json();
  
      const shipmentCollection = await getCollection("shipment");
      if (!shipmentCollection) {
        return Response.json({ message: "Database connection failed" }, { status: 500 });
      }
  
      const payload = {
        billedTo: new ObjectId(formData.billedTo),
        from: new ObjectId(formData.from),
        to: new ObjectId(formData.to),
        pickupDate:formData.pickupDate,
        unloadDate:formData.unloadDate,
        price:parseFloat(formData.price),
        capacity:formData.capacity,
        remarks:formData?.remarks,
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