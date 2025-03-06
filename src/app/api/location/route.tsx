import getCollection from "@/lib/db";

export async function GET() {
  try {
    const locationCollection = await getCollection("location");

    let location = await locationCollection.find().toArray();
    return Response.json(location);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
