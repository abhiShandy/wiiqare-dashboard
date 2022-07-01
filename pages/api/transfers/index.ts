import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";

const Transfers: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URL || "");

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
      response.status(500).json({});
    }

    try {
      const cursor = client
        .db("transactions")
        .collection<WiiQare.Transfer>("transfers")
        .find();
      const data = await cursor.toArray();
      response.status(200).json(data);
    } catch (error) {
      console.log("Error finding Transfers!");
      response.status(500).json({});
    }
    await client.close();
  }

  if (request.method === "POST") {
    const { expatID, patientID, amount, currency } = request.body;

    const now = new Date().getTime();
    const newTransfer: WiiQare.Transfer = {
      id: uuid(),
      dateCreated: now,
      lastUpdated: now,
      expatID,
      patientID,
      amount,
      currency,
      status: "SUBMITTED",
    };

    const client = new MongoClient(process.env.MONGODB_URL || "");

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
      response.status(500).json({});
    }

    await client
      .db("transactions")
      .collection<WiiQare.Transfer>("transfers")
      .insertOne(newTransfer);

    response.status(204).json({});
    await client.close();
  }
};

export default Transfers;
