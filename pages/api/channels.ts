import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";
import { CreateChannel, credentials, MERCHANT_ID } from "./_common";

const Channels: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const url = `https://api.sandbox.coindirect.com/api/v2/channel?merchantId=${MERCHANT_ID}`;
      const { header } = hawk.client.header(url, "GET", { credentials });
      const coindirectResponse = await axios.get(url, {
        headers: { Authorization: header },
      });
      response.status(200).json(coindirectResponse.data);
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
