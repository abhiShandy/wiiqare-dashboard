import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";

const Expats: NextApiHandler = async (request, response) => {
  if (request.method === "POST") {
    const { name, email, phone, displayCurrency } = request.body;

    const client = new MongoClient(process.env.MONGODB_URL || "");

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
    }

    try {
      const data = await client
        .db("customers")
        .collection<WiiQare.Expat>("expats")
        .insertOne({
          id: uuid(),
          name,
          email,
          phone,
          kyc: "pending",
          displayCurrency,
        });
      response.status(200).json(data);
    } catch (error) {
      console.log("Error creating Expat!");
      response.status(500);
    }
    await client.close();
  }
};

export default Expats;
