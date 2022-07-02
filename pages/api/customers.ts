import { NextApiHandler } from "next";
import MongoDB from "./_mongodb";

const Customers: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    const expats = await MongoDB.ListExpats();
    const patients = await MongoDB.ListPatients();
    response.status(200).json({ expats, patients });
  }
};

export default Customers;
