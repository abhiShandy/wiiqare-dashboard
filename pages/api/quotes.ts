import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";
import { credentials } from "./_common";

const Quotes: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const url = "https://api.sandbox.coindirect.com/api/v1/quote";
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
  }
};

export default Quotes;
