import { MongoClient, WithId } from "mongodb";
import { NextApiHandler } from "next";
import { Expat } from "../../customers";

const GetExpat: NextApiHandler = async (request, response) => {
  if (request.method !== "GET") response.status(300);
  const { id } = request.query;
  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }

  try {
    const cursor = await client
      .db("customers")
      .collection<Expat>("expats")
      .findOne({ id });
    if (cursor) response.status(200).json(cursor);
    else response.status(404);
  } catch (error) {
    console.log("Error finding Expat!");
    response.status(500);
  }
};

export default GetExpat;
