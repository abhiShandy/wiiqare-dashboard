import axios from "axios";
import hawk from "hawk";
import { NextApiHandler } from "next";
import { credentials, MERCHANT_ID } from "../_common";

const Deposits: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const url = `https://api.sandbox.coindirect.com/api/v2/channel/payment?merchantId=${MERCHANT_ID}`;
      const { header } = hawk.client.header(url, "GET", {
        credentials,
      });
      const channelPaymentsList = (
        await axios.get<any[]>(url, {
          headers: { Authorization: header },
        })
      ).data;

      channelPaymentsList.sort((a, b) => a.dateCreated - b.dateCreated);

      const filteredChannelPayments = channelPaymentsList.filter(
        (cp) => cp.paidAmount > 0
      );
      response.status(200).json(filteredChannelPayments);
    } catch (error) {
      console.log("Error getting channel payments");
      response.status(500).json({});
      return;
    }
  }
};

export default Deposits;
