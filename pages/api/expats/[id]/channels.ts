import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { CreateChannel } from "../../_common";

const GetChannel: NextApiHandler = async (request, response) => {
  if (request.method !== "GET") response.status(300).json({});

  const { id, payCurrency } = request.query as {
    id: string;
    payCurrency: string;
  };

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

    if (!cursor) {
      response.status(400).json({});
      await client.close();
      return;
    }

    if (cursor.channels && cursor.channels.length > 0) {
      const channel = cursor.channels.find(
        (c) => c.payCurrency === payCurrency
      );

      if (channel) response.status(200).json(channel);
      else {
        const channel = await CreateChannel(
          cursor.displayCurrency,
          payCurrency,
          `${id}-${payCurrency}-${cursor.displayCurrency}`
        );

        if (channel) {
          await client
            .db("customers")
            .collection<WiiQare.Expat>("expats")
            .updateOne({ id }, { $addToSet: { channels: channel } });
          response.status(200).json(channel);
        } else response.status(500).json({});
      }
    } else {
      const channel = await CreateChannel(
        cursor.displayCurrency,
        payCurrency,
        `${id}-${payCurrency}-${cursor.displayCurrency}`
      );

      if (channel) {
        await client
          .db("customers")
          .collection<WiiQare.Expat>("expats")
          .updateOne({ id }, { $addToSet: { channels: channel } });
        response.status(200).json(channel);
      } else response.status(500).json({});
    }
  } catch (error) {
    response.status(500).json({});
  }

  await client.close();
};

export default GetChannel;
