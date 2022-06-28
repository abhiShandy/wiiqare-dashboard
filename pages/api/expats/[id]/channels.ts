import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const GetChannel: NextApiHandler = async (request, response) => {
  if (request.method !== "GET") response.status(300);

  const { id, payCurrency } = request.query;

  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
    response.status(500);
  }

  try {
    const cursor = await client
      .db("customers")
      .collection<WiiQare.Expat>("expats")
      .findOne({ id });
    if (cursor && cursor.channels && cursor.channels.length > 0) {
      const channel = cursor.channels.find(
        (c) => c.payCurrency === payCurrency
      );
      response.status(200).json(channel);
    }
    response.status(400).json({});
  } catch (error) {
    console.log("Error finding Expat!");
    response.status(500);
  }

  await client.close();
};

export default GetChannel;
