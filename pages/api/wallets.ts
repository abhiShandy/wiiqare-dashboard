import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";
import { credentials } from "./_common";

const Wallets: NextApiHandler = async (request, response) => {
  const url = "https://api.sandbox.coindirect.com/api/wallet";
  if (request.method === "GET") {
    try {
      const { header } = hawk.client.header(url, "GET", {
        credentials,
      });
      const coindirectResponse = await axios.get(url, {
        headers: { Authorization: header },
      });
      response.status(200).json(coindirectResponse.data);
    } catch (error) {
      response.status(500).json({});
    }
  } else if (request.method === "POST") {
    const { currency, description } = request.body;
    try {
      const { header } = hawk.client.header(url, "POST", {
        credentials,
      });
      const coindirectResponse = await axios.post(
        url,
        { currency, description },
        {
          headers: { Authorization: header },
        }
      );
      response.status(200).json(coindirectResponse.data);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Wallets;
