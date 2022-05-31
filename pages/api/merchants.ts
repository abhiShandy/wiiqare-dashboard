import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";
import { credentials } from "./_common";

const Merchants: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const url = "https://api.sandbox.coindirect.com/api/v1/merchant";
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

export default Merchants;
