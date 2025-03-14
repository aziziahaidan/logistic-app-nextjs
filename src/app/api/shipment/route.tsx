import getCollection from "@/lib/db";

export async function GET() {
  try {
    const shipmentCollection = await getCollection("shipment");

    const shipment = await shipmentCollection.aggregate([
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
          toDetail: { $ifNull: ["$toDetail", {}] } ,
          billedToDetail: { $ifNull: ["$billedToDetail", {}] } 
        }
      }
    ]).toArray();



    return Response.json(shipment);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
