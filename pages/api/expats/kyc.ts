import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const KYC: NextApiHandler = async (request, response) => {
  if (request.method === "POST") {
    const client = new MongoClient(process.env.MONGODB_URL || "");

    const { id } = request.body;

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
    }

    try {
      const data = await client
        .db("customers")
        .collection<WiiQare.Expat>("expats")
        .updateOne({ id }, { $set: { kyc: "complete" } });
      await client.close();
      response.status(200).json(data);
    } catch (error) {
      console.log("Error updating KYC");
      console.log(error);

      response.status(500).json({});
    }
    await client.close();
  }
};

export default KYC;
