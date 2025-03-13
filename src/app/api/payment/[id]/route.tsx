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
