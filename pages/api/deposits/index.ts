import { NextApiHandler } from "next";
import { ListChannelPayments } from "../_common";

const Deposits: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const channelPayments = await ListChannelPayments();

      if (!channelPayments) {
        response.status(200).json({});
        return;
      }

      channelPayments.sort((a, b) => a.dateCreated - b.dateCreated);

      const filteredChannelPayments = channelPayments.filter(
        (cp) => cp.paidAmount > 0
      );
      response.status(200).json(filteredChannelPayments);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Deposits;
