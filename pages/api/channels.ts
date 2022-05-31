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
  }
};

export default Channels;
