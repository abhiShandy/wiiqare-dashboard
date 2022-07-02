import { NextApiHandler } from "next";
import { ListQuotes } from "./_common";

const Quotes: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const quotes = await ListQuotes();
      response.status(200).json(quotes);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Quotes;
