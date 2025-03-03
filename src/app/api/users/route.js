import getCollection from "@/lib/db";

export async function GET() {
  try {
    const usersCollection = await getCollection("users");

    const users = await usersCollection.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "role"
        }
      },
    ]).toArray();

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
