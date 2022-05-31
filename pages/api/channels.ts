import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";

const MERCHANT_ID: string = process.env.MERCHANT_ID || "";

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.COINDIRECT_HAWK_ID || "",
  key: process.env.COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

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
      const url = `https://api.sandbox.coindirect.com/api/v2/channel`;
      const { header } = hawk.client.header(url, "POST", { credentials });
      await axios.post(
        url,
        { merchantId: MERCHANT_ID, displayCurrency, payCurrency, reference },
        {
          headers: { Authorization: header },
        }
      );
      response.status(200).json({});
    } catch (error) {
      console.log(error);
      response.status(500).json({});
    }
  }
};

export default Channels;
