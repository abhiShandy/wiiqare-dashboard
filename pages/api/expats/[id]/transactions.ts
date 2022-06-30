import axios from "axios";
import hawk from "hawk";
import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { credentials, MERCHANT_ID } from "../../_common";

const Transactions: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    const { id } = request.query;

    try {
      // List all channel payments
      let channelPaymentsList: any[];
      try {
        const url = `https://api.sandbox.coindirect.com/api/v2/channel/payment?merchantId=${MERCHANT_ID}`;
        const { header } = hawk.client.header(url, "GET", {
          credentials,
        });
        channelPaymentsList = (
          await axios.get<any[]>(url, {
            headers: { Authorization: header },
          })
        ).data;
      } catch (error) {
        console.log("Error getting channel payments");
        response.status(500).json({});
        return;
      }

      // Get all channel UUIDs of the concerned expat from the DB
      let channelRefs: string[] | undefined;
      const client = new MongoClient(process.env.MONGODB_URL || "");

      try {
        await client.connect();
      } catch (error) {
        console.log("Error connecting to MongoDB");
        response.status(500).json({});
        return;
      }

      try {
        const cursor = await client
          .db("customers")
          .collection<WiiQare.Expat>("expats")
          .findOne({ id });

        channelRefs = cursor?.channels?.map<string>((c) => c.reference);
      } catch (error) {
        response.status(500).json({});
        return;
      }

      // Filter channelPayments by channel references

      if (!channelRefs) {
        response.status(404).json({});
        return;
      }

      const filteredChannelPayments = channelPaymentsList.filter((cp) =>
        channelRefs?.includes(cp.reference)
      );

      // Transform the filtered channel payments to "Transaction" type

      const transactions = filteredChannelPayments.map<WiiQare.Transaction>(
        (fcp) => ({
          paidAmount: fcp.paidAmount,
          paidCurrency: fcp.paidCurrency,
          displayAmount: fcp.displayAmount,
          displayCurrency: fcp.displayCurrency,
          hash: fcp.hash,
          dateCreated: fcp.dateCreated,
          lastUpdated: fcp.lastUpdated,
          status: fcp.status,
        })
      );

      await client.close();
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Transactions;
