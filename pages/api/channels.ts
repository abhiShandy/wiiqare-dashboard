import { NextApiHandler } from "next";
import { CreateChannel, ListChannels } from "./_common";

const Channels: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const channels = await ListChannels();
      response.status(200).json(channels);
    } catch (error) {
      response.status(500);
    }
  } else if (request.method === "POST") {
    try {
      const { displayCurrency, payCurrency, reference } = request.body;
      const channel = await CreateChannel(
        displayCurrency,
        payCurrency,
        reference
      );
      response.status(200).json(channel);
    } catch (error) {
      console.log(error);
      response.status(500).json({});
    }
  }
};

export default Channels;
