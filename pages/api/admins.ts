import { NextApiHandler } from "next";
import MongoDB from "./_mongodb";

const Admins: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    const admins = await MongoDB.ListAdmins();
    response.status(200).json(admins);
  }
};

export default Admins;
