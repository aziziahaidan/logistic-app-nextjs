import getCollection from "@/lib/db";

export async function GET() {
  try {
    const companyCollection = await getCollection("company");

    let company = await companyCollection.find().toArray();
    return Response.json(company);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
