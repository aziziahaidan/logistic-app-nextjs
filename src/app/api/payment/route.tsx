import getCollection from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const isPaid = searchParams.get("isPaid");
    const companyId = searchParams.get("companyId");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const shipmentCollection = await getCollection("shipment");

    let filter: any = {};
    
    if (isPaid !== null) {
      filter.isPaid = isPaid === "true"; 
    }
    
    if (companyId) {
      filter.billedTo = new ObjectId(companyId); 
    }

    if (dateFrom || dateTo) {
      filter.pickupDate = {};
      if (dateFrom) filter.pickupDate.$gte = new Date(dateFrom);
      if (dateTo) filter.pickupDate.$lte = new Date(dateTo);
    }

    let shipment = await shipmentCollection.aggregate([
      { $match: filter }, 
      {
        $lookup: {
          from: "company",
          localField: "billedTo",
          foreignField: "_id",
          as: "billedToDetail"
        }
      },
      {
        $unwind: {
          path: "$billedToDetail",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "location",
          localField: "from",
          foreignField: "_id",
          as: "fromDetail"
        }
      },
      {
        $unwind: {
          path: "$fromDetail",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "location",
          localField: "to",
          foreignField: "_id",
          as: "toDetail"
        }
      },
      {
        $unwind: {
          path: "$toDetail",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          fromDetail: { $ifNull: ["$fromDetail", {}] },
          toDetail: { $ifNull: ["$toDetail", {}] },
          billedToDetail: { $ifNull: ["$billedToDetail", {}] }
        }
      }
    ]).toArray();

    return Response.json(shipment);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error fetching shipments" }, { status: 500 });
  }
}
