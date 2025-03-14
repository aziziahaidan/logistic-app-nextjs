import getCollection from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rateCollection = await getCollection("rate");

    let rate = await rateCollection.aggregate([
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
          toDetail: { $ifNull: ["$toDetail", {}] } 
        }
      }
    ]).toArray();



    return NextResponse.json(rate);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
