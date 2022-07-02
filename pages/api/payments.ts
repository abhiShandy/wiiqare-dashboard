import { NextApiHandler } from "next";
import { ListPayments } from "./_coindirect";

const Payments: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const payments = await ListPayments();
      response.status(200).json(payments);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Payments;
