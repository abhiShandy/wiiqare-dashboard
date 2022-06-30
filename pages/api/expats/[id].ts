import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const GetExpat: NextApiHandler = async (request, response) => {
  if (request.method !== "GET") response.status(300);
  const { id } = request.query;
  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
    response.status(500).json({});
  }

  try {
    const cursor = await client
      .db("customers")
      .collection<WiiQare.Expat>("expats")
      .findOne({ id });
    if (cursor) response.status(200).json(cursor);
    else response.status(404);
  } catch (error) {
    console.log("Error finding Expat!");
    response.status(500).json({});
  }
  await client.close();
};

export default GetExpat;
