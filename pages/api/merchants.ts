import { NextApiHandler } from "next";
import { ListMerchants } from "./_common";

const Merchants: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const merchants = await ListMerchants();
      response.status(200).json(merchants);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Merchants;
